import axios from "axios";

export class HttpClient {
  constructor(private readonly url: string) {}

  private readonly client = axios.create({
    baseURL: this.url,
  });

  async get<T>({
    path = "/",
    params,
  }: {
    path?: string;
    params?: Record<string, any>;
  }): Promise<T> {
    const response = await this.client.get<T>(path, { params });

    return response.data;
  }
}
