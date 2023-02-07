import React from "react";

import { Filter } from "@/components/PostFilter";
import { Post } from "@/components/PostItem";

// FIXME: попробуй преобразовать сортировку без any

export const useSortedPosts = (posts: Post[], sortByKey: string) => {
  const sortedPosts = React.useMemo(() => {
    if (!sortByKey) return posts;

    const localPosts = [...posts];
    localPosts.sort((a, b) =>
      (a as any)[sortByKey].localeCompare((b as any)[sortByKey])
    );
    return localPosts;
  }, [posts, sortByKey]);

  return sortedPosts;
};

export const usePosts = (posts: Post[], filter: Filter) => {
  const sortedPosts = useSortedPosts(posts, filter.sort);

  const sortedAndSearchedPosts = React.useMemo(() => {
    if (!filter.query) return sortedPosts;
    const q = filter.query.toLocaleLowerCase();
    return sortedPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q)
    );
  }, [sortedPosts, filter.query]);

  return sortedAndSearchedPosts;
};
