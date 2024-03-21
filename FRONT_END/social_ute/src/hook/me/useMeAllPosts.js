import { useCallback, useState } from "react";
import { getAllMePosts } from "services/me.svc";

export const useMeAllPosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchMePosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const dataPosts = await getAllMePosts();
      setPosts(dataPosts.data.posts);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Error: ", error);
    }
  }, []);

  return {
    posts,
    isLoading,

    fetchMePosts,
  };
};
