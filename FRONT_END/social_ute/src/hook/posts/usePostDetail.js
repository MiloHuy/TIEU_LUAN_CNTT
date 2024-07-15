import { useCallback, useState } from "react";
import { getPostById } from "services/post/api-get.svc";
import { errorHandler } from "utils/error-response.utils";

export const usePostDetail = () => {
  const [res, setRes] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPostDetails = useCallback(async (post_id) => {
    try {
      setIsLoading(false);
      const postById = await getPostById(post_id);
      setRes(postById.data);
      setIsLoading(true);
    } catch (err) {
      setIsLoading(true);
      setRes(err.response.data);
      // errorHandler(err);
    }
  }, []);

  return {
    ...res,
    isLoading,

    fetchPostDetails,
  };
};
