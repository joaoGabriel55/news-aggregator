import { NewsArticle } from "@/domain/news-article";
import { HttpClient } from "@/lib/http-client";
import {
  FetchArticlesParams,
  NewsAPIAdapter,
} from "../news-api-adapter.interface";

type Person = {
  firstname: string;
  lastname: string;
};

type ResponseAPI = {
  response: {
    docs: {
      headline: {
        main: string;
      };
      web_url: string;
      snippet: string;
      pub_date: string;
      byline: {
        original: string;
        person: Person[];
      };
    }[];
  };
};

export class TheNewYorkTimesAPIAdapter implements NewsAPIAdapter {
  constructor(
    private readonly httpClient: HttpClient = new HttpClient(
      import.meta.env.VITE_THE_NEW_YORK_TIMES_API_URI
    ),
    private readonly apiKey = import.meta.env.VITE_THE_NEW_YORK_TIMES_API_KEY
  ) {}

  async fetchArticles(params: FetchArticlesParams): Promise<NewsArticle[]> {
    const { date, query, tags } = params;

    const { response } = await this.httpClient.get<ResponseAPI>({
      path: "/articlesearch.json",
      params: {
        ...(query || tags?.length
          ? {
              q: `${query || ""} ${
                tags?.length ? `AND ${tags.join(" OR ")}` : ""
              }`.trim(),
            }
          : {}),
        begin_date: date?.from,
        end_date: date?.to,
        "api-key": this.apiKey,
      },
    });

    return response.docs.map((article) => ({
      title: article?.headline?.main,
      description: article?.snippet,
      link: article?.web_url,
      publishedAt: new Date(article?.pub_date),
      author: this.formatAuthor(article?.byline?.person),
    }));
  }

  private formatAuthor(people: Person[]): string {
    return people
      .map((person) => `${person?.firstname} ${person?.lastname || ""}`.trim())
      .join(", ");
  }
}
