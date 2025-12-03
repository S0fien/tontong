import { useEffect, useState } from "react";
import type { IndexEntry } from "../interfaces";

export type CacheMap = Record<string, any>;

export default function useOutputIndex() {
  const [indexList, setIndexList] = useState<IndexEntry[]>([]);
  const [itemsCache, setItemsCache] = useState<CacheMap>({});
  const [loadingIndex, setLoadingIndex] = useState<boolean>(true);
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadIndex() {
      try {
        const indexResp = await fetch("/output/index.json");
        if (!indexResp.ok)
          throw new Error(`Failed to fetch index.json: ${indexResp.status}`);
        const index = await indexResp.json();
        if (!mounted) return;
        setIndexList(index || []);
        setLoadingIndex(false);

        // optionally preload first item
        if (index && index[0] && index[0].json) {
          setLoadingItemId(index[0].id);
          try {
            console.log("index", index);
            const it = await fetch(`/output/${index[0].json}`);
            if (it.ok) {
              const d = await it.json();
              if (mounted) setItemsCache((p) => ({ ...p, [index[0].id]: d }));
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
    console.log("list", indexList);
    if (!indexList || !indexList.length) return;
    console.log("first");
    if (itemsCache[id]) return; // already loaded
    const entry = indexList.find((e) => e.id === id);
    console.log("hok", entry, indexList);
    if (!entry || !entry.json) return;
    try {
      setLoadingItemId(id);
      const res = await fetch(`output/${entry.json}`);
      if (!res.ok)
        throw new Error(`Failed to fetch ${entry.json}: ${res.status}`);
      const data = await res.json();
      console.log("res:", res, data);
      setTimeout(() => {
        console.log("cache", itemsCache);
        setItemsCache((p) => ({ ...p, [id]: data }));
      }, 500);
    } catch (err) {
      console.error("useOutputIndex loadItem failed", err);
    } finally {
      setLoadingItemId((curr) => (curr === id ? null : curr));
    }
  }

  return {
    indexList,
    itemsCache,
    loadingIndex,
    loadingItemId,
    loadItem,
    loadItems,
  } as const;
}
