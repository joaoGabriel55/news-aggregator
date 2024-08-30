import { NewsAPI } from "@/services/news-api";
import { NewsAPIAdapter } from "@/services/news-api-adapter.interface";
import { NewsAPIOrgAdapter } from "@/services/news-api-adapters/news-api-org-adapter";
import { TheGuardianAPIAdapter } from "@/services/news-api-adapters/the-guardian-api-adapter";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export type APISources = "newsapi-org" | "the-guardian" | "newsapi";

export const sources: Record<APISources, NewsAPIAdapter> = {
  "newsapi-org": new NewsAPIOrgAdapter(),
  "the-guardian": new TheGuardianAPIAdapter(),
  newsapi: new TheGuardianAPIAdapter(),
} as const;

export function useNewsArticles() {
  const [searchParams] = useSearchParams();

  const source = searchParams.get("source") as APISources;
  const query = searchParams.get("query");
  const from = searchParams.get("from");
  const categories = searchParams.get("categories");

  const { isError, isLoading, data, refetch } = useQuery({
    queryKey: ["news-articles", source, query, from, categories],
    queryFn: () => {
      if (!source) return Promise.resolve([]);

      const newsAPI = new NewsAPI(sources[source]);

      const [date] = (from || new Date().toISOString()).split("T");

      return newsAPI.fetchArticles({
        query: query || undefined,
        tags: categories?.split(",") || undefined,
        date: { from: date, to: date },
      });
    },
  });

  useEffect(() => {
    if (source) refetch();
  }, [source, query, from, categories]);

  return { isError, isLoading, data };
}
