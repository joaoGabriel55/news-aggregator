import { NewsArticle } from "@/domain/news-article";
import { HttpClient } from "@/lib/http-client";
import {
  FetchArticlesParams,
  NewsAPIAdapter,
} from "../news-api-adapter.interface";

type ResponseAPI = {
  response: {
    results: any[];
  };
};

export class TheGuardianAPIAdapter implements NewsAPIAdapter {
  constructor(
    private readonly httpClient: HttpClient = new HttpClient(
      import.meta.env.VITE_THE_GUARDIAN_API_URI
    ),
    private readonly apiKey = import.meta.env.VITE_THE_GUARDIAN_API_KEY
  ) {}

  async fetchArticles(params: FetchArticlesParams): Promise<NewsArticle[]> {
    const { date, query, tags } = params;

    const { response } = await this.httpClient.get<ResponseAPI>({
      path: "/search",
      params: {
        ...(query || tags?.length
          ? {
              q: `${query || ""} ${
                tags?.length ? `AND ${tags.join(" OR ")}` : ""
              }`.trim(),
            }
          : {}),
        "from-date": date?.from,
        "to-date": date?.to,
        "api-key": this.apiKey,
        "show-tags": "contributor",
        "order-by": "relevance",
        "show-fields:": "trailText",
      },
    });

    return response.results.map((article) => ({
      title: article?.webTitle,
      description: article?.fields?.trailText,
      link: article?.webUrl,
      publishedAt: new Date(article?.webPublicationDate),
      author: article.tags?.[0]?.webTitle,
    }));
  }
}
