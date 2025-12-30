import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import JSZip from "jszip";
import { useEffect, useState } from "react";
import { ASSETS_BUCKETS } from "../constants";
import type { CardType } from "../interfaces";
import { indexRoute, rootRoute } from "../routes";
import { supabase } from "../services/supabase";
import { useAppStore } from "../store";

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

// ---------------------- Output index hook (simplified - index only) ----------------------

export function useOutputIndex() {
  const { index } = useAppStore();

  const [indexList, setIndexList] = useState<CardType[]>(index);
  const [loadingIndex, setLoadingIndex] = useState<boolean>(true);
  const [currentEntry, setCurrentEntry] = useState<CardType | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadIndex() {
      try {
        const jo = await supabase.storage.from(ASSETS_BUCKETS);
        const { data } = await jo.getPublicUrl("index.json.zip");
        const truc = await fetch(data.publicUrl!, { method: "GET" });
        const new_zip = new JSZip();
        const blob = await truc.blob();
        const lala = await new_zip.loadAsync(blob);
        const jsonFile = lala.file("index.json");
        if (!jsonFile) {
          console.error("no jsonfile");
          throw new Error("index.json not found in zip");
        }
        const content = await jsonFile.async("text");
        const index = JSON.parse(content);
        if (!mounted) return;
        setIndexList(index || []);
        setLoadingIndex(false);

        // Optionally set the first entry as current
        if (index && index[0]) {
          setCurrentEntry(index[0]);
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

  // Simplified: just set the current entry from the index
  function selectItem(id: string) {
    const entry = indexList.find((e) => e.id === id);
    if (entry) {
      setCurrentEntry(entry);
    }
  }

  return {
    indexList,
    loadingIndex,
    currentEntry,
    setCurrentEntry,
    selectItem,
  } as const;
}

export default useOutputIndex;
