import { useNewsArticles } from "@/hooks/use-news-articles";
import { ArticleCard } from "./article-card";
import { Message } from "@/components/shared/message";

export function Articles() {
  const { data, isError, isLoading } = useNewsArticles();

  console.log(data);

  if (isError) {
    return <Message content="Something went wrong. Please try again later." />;
  }

  if (isLoading) {
    return <Message content="Loading articles. Please wait..." />;
  }

  if (!data || data.length === 0) {
    return <Message content="No articles found. Please try again later." />;
  }

  return (
    <div className="grid grid-cols-1 px-2 h-fit sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((article, index) => (
        <ArticleCard
          key={index}
          title={article.title}
          link={article.link}
          author={article.author}
          description={article.description}
          publishedAt={article.publishedAt}
        />
      ))}
    </div>
  );
}
