import { useCallback, useState } from "react";
import { getAllPostGroup } from "services/group/api-get.svc";
import { errorHandler } from "utils/error-response.utils";

export const useAllPostGroup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resPonse, setResPonse] = useState([1, 2, 3, 4, 5]);

  const fetchAllPostGroup = useCallback(async () => {
    try {
      const res = await getAllPostGroup();
      setResPonse(res.data.posts);

      setIsLoading(true);
    } catch (error) {
      setIsLoading(true);
      console.error("Failed to fetch all post group: ", error);
      errorHandler(error);
    }
  }, []);

  return {
    isLoading,
    resPonse,

    fetchAllPostGroup,
  };
};
