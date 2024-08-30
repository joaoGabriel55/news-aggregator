import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function usePersonalizedFeeds() {
  const [, setSearchParams] = useSearchParams();

  const [personalizedFeeds, setPersonalizedFeeds] = useState(
    JSON.parse(localStorage.getItem("personalized-feeds") || "{}")
  );

  function savePersonalizedFeed({
    feedName,
    source,
    query,
    from,
    categories,
  }: {
    feedName: string;
    source: string;
    query: string;
    from: string;
    categories: string[];
  }) {
    const newPersonalizedFeed = {
      [feedName]: { source, query, from, categories },
    };

    if (personalizedFeeds) {
      localStorage.setItem(
        "personalized-feeds",
        JSON.stringify({ ...personalizedFeeds, ...newPersonalizedFeed })
      );
    } else {
      localStorage.setItem(
        "personalized-feeds",
        JSON.stringify(newPersonalizedFeed)
      );
    }

    setPersonalizedFeeds(
      JSON.parse(localStorage.getItem("personalized-feeds") || "{}")
    );
  }

  function deletePersonalizedFeed(feedName: string) {
    const personalizedFeeds = localStorage.getItem("personalized-feeds");
    if (personalizedFeeds) {
      const newPersonalizedFeeds = JSON.parse(personalizedFeeds);
      delete newPersonalizedFeeds[feedName];
      localStorage.setItem(
        "personalized-feeds",
        JSON.stringify(newPersonalizedFeeds)
      );

      setPersonalizedFeeds(newPersonalizedFeeds);
    }
  }

  function getPersonalizedFeeds() {
    const personalizedFeeds = localStorage.getItem("personalized-feeds");
    if (personalizedFeeds) {
      return JSON.parse(personalizedFeeds);
    }
  }

  function getPersonalizedFeed(feedName: string) {
    const personalizedFeeds = localStorage.getItem("personalized-feeds");
    if (personalizedFeeds) {
      const newPersonalizedFeeds = JSON.parse(personalizedFeeds);
      return newPersonalizedFeeds[feedName];
    }
  }

  function applyPersonalizedFeed(feedName: string) {
    const personalizedFeeds = localStorage.getItem("personalized-feeds");
    if (personalizedFeeds) {
      const newPersonalizedFeeds = JSON.parse(personalizedFeeds);
      newPersonalizedFeeds[feedName];

      setSearchParams({
        source: newPersonalizedFeeds[feedName].source,
        query: newPersonalizedFeeds[feedName].query,
        from: newPersonalizedFeeds[feedName].from,
        categories: newPersonalizedFeeds[feedName].categories.join(","),
      });
    }
  }

  return {
    personalizedFeeds,
    savePersonalizedFeed,
    deletePersonalizedFeed,
    getPersonalizedFeeds,
    applyPersonalizedFeed,
    getPersonalizedFeed,
  };
}
