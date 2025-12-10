import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ASSETS_BUCKETS } from "../constants";
import type { CacheEntry, IndexEntry } from "../interfaces";
import { indexRoute, rootRoute } from "../routes";
import { supabase } from "../services/supabase";

// ---------------------- Auth hooks (same API as previous useAuth) ----------------------
export interface LoginProps {
  email: string;
  password: string;
}

export const useAuth = () => {
  const useUser = () => {
    return useQuery({
      queryKey: ["user"],
      queryFn: async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        return user;
      },
    });
  };

  const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ email, password }: LoginProps) =>
        supabase.auth.signInWithPassword({ email, password }),
      onSuccess: (data) => {
        queryClient.setQueryData(["user"], data.data.user);
        navigate(indexRoute);
      },
    });
  };

  const useRegister = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ email, password }: LoginProps) =>
        supabase.auth.signUp({ email, password }),
      onSuccess: (data) => {
        queryClient.setQueryData(["user"], data.data.user);
        navigate(indexRoute);
      },
    });
  };

  const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: () => supabase.auth.signOut(),
      onSuccess: () => {
        queryClient.setQueryData(["user"], null);
        navigate(rootRoute);
      },
    });
  };

  return {
    useUser,
    useLogin,
    useRegister,
    useLogout,
  };
};

// ---------------------- Output index hook (same API as previous useOutputIndex) ----------------------
export type CacheMap = CacheEntry;

export function useOutputIndex() {
  const [indexList, setIndexList] = useState<IndexEntry[]>([]);
  const [itemsCache, setItemsCache] = useState<CacheMap[]>([]);
  const [loadingIndex, setLoadingIndex] = useState<boolean>(true);
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentEntry, setCurrentEntry] = useState<IndexEntry | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadIndex() {
      try {
        const jo = await supabase.storage.from(ASSETS_BUCKETS);
        const { data } = await jo.getPublicUrl("index.json");
        const truc = await fetch(data.publicUrl!, { method: "GET" });
        const index = await truc.json();
        console.log("index", index);
        if (!mounted) return;
        setIndexList(index || []);
        setLoadingIndex(false);

        // optionally preload first item
        if (index && index[0] && index[0].json) {
          setLoadingItemId(index[0].id);
          try {
            const { data } = await jo.getPublicUrl(
              index[0].json!.replace("-data.json", "")
            );
            console.log("data", data);
            if (data.publicUrl) {
              console.log("data", data.publicUrl);

              const formattedUrl = data.publicUrl;
              const aaa = await fetch(formattedUrl, { method: "GET" });
              const jo2 = await aaa.json();
              jo2.id = index[0].json;

              console.log("jojo", jo2);
              if (mounted) {
                setItemsCache((p) => [...p, jo2]);
                setCurrentEntry(index[0]);
              }
            }
          } catch (e: unknown) {
            // ignore
            console.log("error", e);
          } finally {
            if (mounted) setLoadingItemId(null);
          }
        }
      } catch (err) {
        console.error("useOutputIndex loadIndex error", err);
        if (mounted) setLoadingIndex(false);
      }
    }
    loadIndex();
    return () => {
      mounted = false;
    };
  }, []);

  async function loadItems(ids: string[]) {
    const promises = ids.map((prom) => {
      return new Promise((resolve) => loadItem(prom).then(() => resolve));
    });

    for (const p of promises) {
      // await each promise sequentially to avoid flooding

      await p;
    }
  }

  async function loadItem(id: string) {
    setLoading(true);
    if (!indexList || !indexList.length) return;
    if (itemsCache.find((item) => item.audio.json === id)) return; // already loaded
    const entry = indexList.find((e) => e.id === id);
    if (!entry || !entry.json) return;
    try {
      setLoadingItemId(id);
      const jo = await supabase.storage.from(ASSETS_BUCKETS);

      const { data } = await jo.getPublicUrl(
        indexList.find((e) => e.id === id)!.json
      );
      const formattedUrl = data.publicUrl!.replace("-data.json", "");
      console.log("formated", formattedUrl);
      const aaa = await fetch(formattedUrl, { method: "GET" });
      const jo2 = await aaa.json();

      jo2.id = jo2.audio.json;
      console.log("jo", jo2);
      setTimeout(() => {
        setItemsCache((p) => [...p, jo2]);
        // set the currently loaded entry so consumers can read it
        const entry = indexList.find((e) => e.id === id) ?? null;
        if (entry) setCurrentEntry(jo2);
      }, 500);
    } catch (err) {
      console.error("useOutputIndex loadItem failed", err);
    } finally {
      setLoadingItemId((curr) => (curr === id ? null : curr));
      setLoading(false);
    }
  }

  return {
    loading,
    indexList,
    itemsCache,
    loadingIndex,
    loadingItemId,
    currentEntry,
    loadItem,
    loadItems,
  } as const;
}

export default useOutputIndex;
