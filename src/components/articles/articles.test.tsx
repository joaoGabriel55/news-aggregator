import { useNewsArticles } from "@/hooks/use-news-articles";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Articles } from "./articles";

vi.mock("@/hooks/use-news-articles");

test("<Articles />", () => {
  describe("<Articles />", () => {
    describe("when there are no articles", () => {
      test("renders a message: 'No articles found. Please try again later.'", () => {
        vi.mocked(useNewsArticles).mockReturnValue({
          data: [],
          isError: false,
          isLoading: false,
        });

        render(<Articles />);

        expect(
          screen.getByText("No articles found. Please try again later.")
        ).toBeInTheDocument();
      });
    });

    describe("when there are articles", () => {
      test("renders an article card for each article", () => {
        vi.mocked(useNewsArticles).mockReturnValue({
          data: [
            {
              title: "Article 1",
              link: "https://example.com/article1",
              author: "Author 1",
              description: "Description 1",
              publishedAt: new Date(),
            },
            {
              title: "Article 2",
              link: "https://example.com/article2",
              author: "Author 2",
              description: "Description 2",
              publishedAt: new Date(),
            },
          ],
          isError: false,
          isLoading: false,
        });

        render(<Articles />);

        expect(screen.getByText("Article 1")).toBeInTheDocument();
        expect(screen.getByText("Article 2")).toBeInTheDocument();
      });
    });

    describe("when there is an error", () => {
      test("renders a message: 'Something went wrong. Please try again later.'", () => {
        vi.mocked(useNewsArticles).mockReturnValue({
          data: [],
          isError: true,
          isLoading: false,
        });

        render(<Articles />);

        expect(
          screen.getByText("Something went wrong. Please try again later.")
        ).toBeInTheDocument();
      });
    });

    describe("when loading", () => {
      test("renders a message: 'Loading articles. Please wait...'", () => {
        vi.mocked(useNewsArticles).mockReturnValue({
          data: [],
          isError: false,
          isLoading: true,
        });

        render(<Articles />);

        expect(
          screen.getByText("Loading articles. Please wait...")
        ).toBeInTheDocument();
      });
    });
  });
});
