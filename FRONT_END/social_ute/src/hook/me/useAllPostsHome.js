import { useCallback, useState } from "react";
import { getAllMePosts } from "services/me.svc";
import { getAllPostsGuest } from "services/user.svc";
import { errorHandler } from "utils/error-response.utils";
import { getUserIdFromCookie } from "utils/user.utils";

export const useAllPostsHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState();

  const fetchPostsHome = useCallback(async (userId) => {
    setIsLoading(true);
    try {
      let dataPosts;
      if (userId === getUserIdFromCookie()) {
        dataPosts = await getAllMePosts();
      } else {
        dataPosts = await getAllPostsGuest(userId);
      }
      setPosts(dataPosts.data.posts);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    posts,
    isLoading,

    fetchPostsHome,
  };
};
