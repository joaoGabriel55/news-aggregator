import { NewsAPI } from "@/services/news-api";
import { NewsAPIAdapter } from "@/services/news-api-adapter.interface";
import { NewsAPIOrgAdapter } from "@/services/news-api-adapters/news-api-org-adapter";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export type APISources = "newsapi-org" | "the-guardian" | "newsapi";

export const sources: Record<APISources, NewsAPIAdapter> = {
  "newsapi-org": new NewsAPIOrgAdapter(),
  "the-guardian": new NewsAPIOrgAdapter(),
  newsapi: new NewsAPIOrgAdapter(),
};

export function useNewsArticles() {
  const [searchParams] = useSearchParams();

  const { isError, isLoading, data, refetch } = useQuery({
    queryKey: ["news"],
    queryFn: () => {
      const source = (searchParams.get("source") ||
        "newsapi-org") as APISources;
      console.log({ source });
      const newsAPI = new NewsAPI(sources[source]);

      const [date] = (
        searchParams.get("from") || new Date().toISOString()
      ).split("T");

      return newsAPI.fetchArticles({
        query: searchParams.get("query") || undefined,
        tags: searchParams.get("categories")?.split(",") || undefined,
        date: { from: date, to: date },
      });
    },
  });

  useEffect(() => {
    refetch();
  }, [
    searchParams.get("query"),
    searchParams.get("categories"),
    searchParams.get("from"),
  ]);

  return { isError, isLoading, data };
}
