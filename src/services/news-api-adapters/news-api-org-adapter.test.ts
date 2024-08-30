import { describe, expect, test, vi } from "vitest";
import { NewsAPIOrgAdapter } from "./news-api-org-adapter";
import { HttpClient } from "@/lib/http-client";

vi.mock("@/lib/http-client");

test("NewsAPIOrgAdapter", () => {
  describe("fetchArticles", () => {
    test("fetches articles", async () => {
      vi.mocked(HttpClient.prototype.get).mockResolvedValue({
        articles: [
          {
            title: "test",
          },
        ],
      });

      const adapter = new NewsAPIOrgAdapter();
      const articles = await adapter.fetchArticles({
        query: "test",
      });

      expect(articles.length).toBeGreaterThan(0);
      expect(articles[0].title).toBe("test");
    });
  });
});
