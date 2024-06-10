import { useCallback, useState } from "react";
import { getPostSaved } from "services/post/api-get.svc";
import { errorHandler } from "utils/error-response.utils";

export const usePostStore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resPonseData, setResponseData] = useState();

  const fetchMePostsStored = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await getPostSaved();
      setResponseData(data.data.posts);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      errorHandler(error);
    }
  }, []);

  return { isLoading, resPonseData, fetchMePostsStored };
};
