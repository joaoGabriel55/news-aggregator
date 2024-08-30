import { NewsArticle } from "@/domain/news-article";

export function ArticleCard({
  title,
  description,
  link,
  author,
  publishedAt,
}: NewsArticle) {
  return (
    <a
      href={link}
      target="_blank"
      className="group border rounded-md p-4 transition duration-150 hover:shadow-md"
    >
      <article className="flex flex-col gap-2 justify-between h-full">
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
        <p className="text-muted-foreground line-clamp-2 mt-2">{description}</p>
        <footer className="mt-auto">
          <p className="text-sm text-gray-500 mt-2 text-right text-muted-foreground line-clamp-2">
            Posted on{" "}
            <time dateTime={publishedAt.toISOString()}>
              {publishedAt.toLocaleDateString()}
            </time>{" "}
            by {author}.
          </p>
        </footer>
      </article>
    </a>
  );
}
