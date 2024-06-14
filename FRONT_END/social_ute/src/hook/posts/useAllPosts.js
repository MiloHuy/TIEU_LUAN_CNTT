import { getAllPost } from "services/post/api-get.svc";
import { errorHandler } from "utils/error-response.utils";

const { useState, useRef, useCallback } = require("react");

export const useAllPost = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const elementRef = useRef(null);
  const [filter, setFilter] = useState({
    page: 1,
    size: 6,
  });

  const fetchAllPosts = useCallback(async (page, size) => {
    try {
      const allPosts = await getAllPost({
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
        fetchAllPosts(filter.page, filter.size);
      }
    },
    [filter.page, filter.size, fetchAllPosts, hasMore],
  );

  return {
    posts,
    elementRef,
    hasMore,
    onIntersection,
  };
};
