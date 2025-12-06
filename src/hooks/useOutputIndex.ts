import { useEffect, useState } from "react";
import type { CacheEntry, IndexEntry } from "../interfaces";
import { supabase } from "../services/supabase";

export type CacheMap = Record<string, CacheEntry>;

export default function useOutputIndex() {
  const [indexList, setIndexList] = useState<IndexEntry[]>([]);
  const [itemsCache, setItemsCache] = useState<CacheMap>({});
  const [loadingIndex, setLoadingIndex] = useState<boolean>(true);
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    async function loadIndex() {
      try {
        const jo = await supabase.storage.from("monologues");
        const { data } = await jo.getPublicUrl("index.json");
        const truc = await fetch(data.publicUrl!, { method: "GET" });
        const index = await truc.json();
        if (!mounted) return;
        setIndexList(index || []);
        setLoadingIndex(false);

        // optionally preload first item
        if (index && index[0] && index[0].json) {
          setLoadingItemId(index[0].id);
          try {
            console.log("index", index);
            const { data } = await jo.getPublicUrl(index[0].json);
            if (data.publicUrl) {
              const aaa = await fetch(data.publicUrl!, { method: "GET" });
              console.log("aaa", aaa);
              const jo2 = await aaa.json();
              console.log("jo2", jo2);

              if (mounted) setItemsCache((p) => ({ ...p, [index[0].id]: jo2 }));
            }
          } catch (e: unknown) {
            console.error("error: ", e);
            // ignore
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
    console.log("receive", ids);
    const promises = ids.map((prom) => {
      return new Promise((resolve) => loadItem(prom).then(() => resolve));
    });

    promises.forEach(async (element) => {
      await element;
    });
    // const responses = Promise.all(promises);
    // console.log("responses", responses);
  }

  async function loadItem(id: string) {
    setLoading(true);
    console.log("list", indexList);
    if (!indexList || !indexList.length) return;
    console.log("first");
    if (itemsCache[id]) return; // already loaded
    const entry = indexList.find((e) => e.id === id);
    console.log("hok", entry, indexList);
    if (!entry || !entry.json) return;
    try {
      setLoadingItemId(id);
      const jo = await supabase.storage.from("monologues");

      const { data } = await jo.getPublicUrl(
        indexList.find((e) => e.id === id)!.json
      );
      const aaa = await fetch(data.publicUrl!, { method: "GET" });
      console.log("aaa", aaa);
      const jo2 = await aaa.json();

      setTimeout(() => {
        console.log("cache", itemsCache);
        setItemsCache((p) => ({ ...p, [id]: jo2 }));
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
    loadItem,
    loadItems,
  } as const;
}
