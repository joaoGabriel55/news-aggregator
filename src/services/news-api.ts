import { NewsArticle } from "@/domain/news-article";
import { NewsAPIAdapter } from "./news-api-adapter.interface";

export class NewsAPI {
  private strategy: NewsAPIAdapter;

  constructor(strategy: NewsAPIAdapter) {
    this.strategy = strategy;
  }

  async fetchArticles({
    query,
    tags,
    date,
  }: {
    query?: string;
    tags?: string[];
    date?: {
      from: string;
      to: string;
    };
  }): Promise<NewsArticle[]> {
    return this.strategy.fetchArticles({ query, tags, date });
  }
}
