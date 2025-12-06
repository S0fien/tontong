import { useCallback, useState } from "react";
import { supabase } from "../services/supabase";

export type FilterValue = string | number | boolean | null | unknown[];

export interface FilterCondition {
  column: string;
  operator: string;
  value: FilterValue;
}

export interface SupabaseQueryOptions {
  select?: string;
  filter?: FilterCondition[];
  limit?: number;
  offset?: number;
  orderBy?: { column: string; ascending?: boolean };
}

export interface SupabaseFile {
  name: string;
  url: string;
  size?: number;
  createdAt?: string;
}

type DatabaseRecord = Record<string, unknown>;

interface UseSupabaseReturn {
  // Database operations
  query: (
    table: string,
    options?: SupabaseQueryOptions
  ) => Promise<DatabaseRecord[]>;
  insert: (
    table: string,
    data: DatabaseRecord | DatabaseRecord[]
  ) => Promise<DatabaseRecord | DatabaseRecord[] | null>;
  update: (
    table: string,
    data: DatabaseRecord,
    filter: { column: string; value: FilterValue }
  ) => Promise<DatabaseRecord[] | null>;
  delete: (
    table: string,
    filter: { column: string; value: FilterValue }
  ) => Promise<void>;

  // Storage operations
  uploadFile: (
    bucket: string,
    path: string,
    file: File
  ) => Promise<SupabaseFile>;
  downloadFile: (bucket: string, path: string) => Promise<Blob>;
  deleteFile: (bucket: string, path: string) => Promise<void>;
  listFiles: (bucket: string, folder?: string) => Promise<SupabaseFile[]>;
  getFileUrl: (bucket: string, path: string) => string;

  // Loading and error states
  isLoading: boolean;
  error: Error | null;
  clearError: () => void;
}

export function useSupabase(): UseSupabaseReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const clearError = useCallback(() => setError(null), []);

  // ============ Database Operations ============

  const query = useCallback(
    async (
      table: string,
      options?: SupabaseQueryOptions
    ): Promise<DatabaseRecord[]> => {
      setIsLoading(true);
      setError(null);
      try {
        let q = supabase.from(table).select(options?.select || "*");

        // Apply filters
        if (options?.filter) {
          for (const f of options.filter) {
            switch (f.operator) {
              case "eq":
                q = q.eq(f.column, f.value);
                break;
              case "neq":
                q = q.neq(f.column, f.value);
                break;
              case "gt":
                q = q.gt(f.column, f.value);
                break;
              case "gte":
                q = q.gte(f.column, f.value);
                break;
              case "lt":
                q = q.lt(f.column, f.value);
                break;
              case "lte":
                q = q.lte(f.column, f.value);
                break;
              case "like":
                q = q.like(f.column, f.value as string);
                break;
              case "ilike":
                q = q.ilike(f.column, f.value as string);
                break;
              case "in":
                q = q.in(f.column, f.value as unknown[]);
                break;
              case "is":
                q = q.is(f.column, f.value);
                break;
            }
          }
        }

        // Apply ordering
        if (options?.orderBy) {
          q = q.order(options.orderBy.column, {
            ascending: options.orderBy.ascending ?? true,
          });
        }

        // Apply limit and offset
        if (options?.limit) {
          q = q.limit(options.limit);
        }
        if (options?.offset) {
          q = q.range(
            options.offset,
            options.offset + (options.limit || 10) - 1
          );
        }

        const { data, error: err } = await q;

        if (err) throw err;
        return (data as unknown as DatabaseRecord[]) || [];
      } catch (err: unknown) {
        const error = new Error(typeof err === "string" ? err : "Query failed");
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const insert = useCallback(
    async (
      table: string,
      data: DatabaseRecord | DatabaseRecord[]
    ): Promise<DatabaseRecord | DatabaseRecord[] | null> => {
      setIsLoading(true);
      setError(null);
      try {
        const { data: result, error: err } = await supabase
          .from(table)
          .insert(data)
          .select();

        if (err) throw err;
        return result;
      } catch (err: unknown) {
        const error = new Error(
          typeof err === "string" ? err : "Insert failed"
        );
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const update = useCallback(
    async (
      table: string,
      data: DatabaseRecord,
      filter: { column: string; value: FilterValue }
    ): Promise<DatabaseRecord[] | null> => {
      setIsLoading(true);
      setError(null);
      try {
        const { data: result, error: err } = await supabase
          .from(table)
          .update(data)
          .eq(filter.column, filter.value)
          .select();

        if (err) throw err;
        return result;
      } catch (err: unknown) {
        const error = new Error(
          typeof err === "string" ? err : "Update failed"
        );
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deleteRecord = useCallback(
    async (
      table: string,
      filter: { column: string; value: FilterValue }
    ): Promise<void> => {
      setIsLoading(true);
      setError(null);
      try {
        const { error: err } = await supabase
          .from(table)
          .delete()
          .eq(filter.column, filter.value);

        if (err) throw err;
      } catch (err: unknown) {
        const error = new Error(
          typeof err === "string" ? err : "Delete failed"
        );
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // ============ Storage Operations ============

  const uploadFile = useCallback(
    async (bucket: string, path: string, file: File): Promise<SupabaseFile> => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase.storage
          .from(bucket)
          .upload(path, file, { upsert: true });

        if (err) throw err;

        const url = supabase.storage.from(bucket).getPublicUrl(data.path)
          .data.publicUrl;

        return {
          name: file.name,
          url,
          size: file.size,
          createdAt: new Date().toISOString(),
        };
      } catch (err: unknown) {
        const error = new Error(
          typeof err === "string" ? err : "Upload failed"
        );
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const downloadFile = useCallback(
    async (bucket: string, path: string): Promise<Blob> => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase.storage
          .from(bucket)
          .download(path);

        if (err) throw err;
        return data;
      } catch (err: unknown) {
        const error = new Error(
          typeof err === "string" ? err : "Download failed"
        );
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deleteFile = useCallback(
    async (bucket: string, path: string): Promise<void> => {
      setIsLoading(true);
      setError(null);
      try {
        const { error: err } = await supabase.storage
          .from(bucket)
          .remove([path]);

        if (err) throw err;
      } catch (err: unknown) {
        const error = new Error(
          typeof err === "string" ? err : "Delete failed"
        );
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const listFiles = useCallback(
    async (bucket: string, folder?: string): Promise<SupabaseFile[]> => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase.storage
          .from(bucket)
          .list(folder);

        if (err) throw err;

        return (data || []).map((file) => ({
          name: file.name,
          url: supabase.storage
            .from(bucket)
            .getPublicUrl(folder ? `${folder}/${file.name}` : file.name).data
            .publicUrl,
          size: file.metadata?.size,
          createdAt: file.created_at,
        }));
      } catch (err: unknown) {
        const error = new Error(typeof err === "string" ? err : "List failed");
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getFileUrl = useCallback((bucket: string, path: string): string => {
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  }, []);

  return {
    query,
    insert,
    update,
    delete: deleteRecord,
    uploadFile,
    downloadFile,
    deleteFile,
    listFiles,
    getFileUrl,
    isLoading,
    error,
    clearError,
  };
}
