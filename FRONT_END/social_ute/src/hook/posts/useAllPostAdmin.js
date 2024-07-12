import { useCallback, useRef, useState } from "react";
import { getAllPosts } from "services/admin.svc";
import { errorHandler } from "utils/error-response.utils";

export const useAllPostAdmin = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const elementRef = useRef(null);
  const [filter, setFilter] = useState({
    page: 1,
    size: 6,
  });

  const fetchAllPostsAdmin = useCallback(async (page, size) => {
    try {
      const allPosts = await getAllPosts({
        page: page,
        size: size,
      });

      if (allPosts.data.posts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => {
          if (Array.isArray(prev)) {
            const newData = [...prev, ...allPosts.data.posts];
            return newData;
          } else {
            return [...allPosts.data.posts];
          }
        });

        setFilter((prev) => ({
          ...prev,
          page: prev.page + 1,
        }));
      }
    } catch (error) {
      console.log("Error: ", error);
      errorHandler(error);
    }
  }, []);

  const onIntersection = useCallback(
    (entries) => {
      const firstEntries = entries[0];
      if (firstEntries.isIntersecting && hasMore) {
        fetchAllPostsAdmin(filter.page, filter.size);
      }
    },
    [filter.page, filter.size, fetchAllPostsAdmin, hasMore],
  );

  return {
    posts,
    elementRef,
    hasMore,
    onIntersection,
  };
};