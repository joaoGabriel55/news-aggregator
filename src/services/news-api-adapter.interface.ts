import { NewsArticle } from "@/domain/news-article";

export type FetchArticlesParams = {
  query?: string;
  tags?: string[];
  date?: {
    from: string;
    to: string;
  };
};

export interface NewsAPIAdapter {
  fetchArticles: ({
    query,
    tags,
    date,
  }: FetchArticlesParams) => Promise<NewsArticle[]>;
}
