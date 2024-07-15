import { useCallback, useEffect, useRef, useState } from "react";
import { getAllMePosts } from "services/me.svc";
import { getAllPostsGuest } from "services/user.svc";
import { errorHandler } from "utils/error-response.utils";
import { getUserIdFromCookie } from "utils/user.utils";

export const useAllPostsHome = (userId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const elementRef = useRef(null);
  const [filter, setFilter] = useState({ page: 1, size: 6 });

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const isCurrentUser = userId === getUserIdFromCookie();
      const service = isCurrentUser ? getAllMePosts : getAllPostsGuest;
      const dataPosts = await service(userId, { page: filter.page, size: filter.size });

      if (dataPosts.data.posts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...dataPosts.data.posts]);
        setFilter((prevFilter) => ({ ...prevFilter, page: prevFilter.page + 1 }));
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }, [userId, filter.page, filter.size]);

  const onIntersection = useCallback((entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      fetchPosts();
    }
  }, [fetchPosts, hasMore]);

  return { isLoading, posts, elementRef, hasMore, onIntersection };
};
