import { NewsArticle } from "@/domain/news-article";
import { HttpClient } from "@/lib/http-client";
import {
  FetchArticlesParams,
  NewsAPIAdapter,
} from "../news-api-adapter.interface";

type ResponseAPI = {
  articles: {
    title: string;
    description: string;
    url: string;
    publishedAt: string;
    author: string;
  }[];
};

export class NewsAPIOrgAdapter implements NewsAPIAdapter {
  constructor(
    private readonly httpClient: HttpClient = new HttpClient(
      import.meta.env.VITE_NEWS_API_ORG_URI
    ),
    private readonly apiKey = import.meta.env.VITE_NEWS_API_ORG_KEY
  ) {}

  async fetchArticles(params: FetchArticlesParams): Promise<NewsArticle[]> {
    const { date, query, tags } = params;

    const dateToday = new Date().toISOString();
    const topHeadlines = {
      path: "/top-headlines",
      params: { apiKey: this.apiKey, country: "us" },
    };

    const everything = {
      path: "/everything",
      params: {
        ...(query || tags
          ? {
              q: `${query || ""} ${tags ? `${tags.join(" OR ")}` : ""}`.trim(),
              searchIn: "title,description",
            }
          : {}),
        ...(date
          ? { from: date.from, to: date.to }
          : { from: dateToday, to: dateToday }),
        sortBy: "popularity",
        apiKey: this.apiKey,
      },
    };

    const response = await this.httpClient.get<ResponseAPI>(
      query || tags?.length ? everything : topHeadlines
    );

    return response.articles.map((article) => ({
      title: article.title,
      description: article.description,
      link: article.url,
      publishedAt: new Date(article.publishedAt),
      author: article.author,
    }));
  }
}
