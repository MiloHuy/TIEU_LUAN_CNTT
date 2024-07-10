import { useCallback, useState } from "react";
import { getPostById } from "services/post/api-get.svc";
import { errorHandler } from "utils/error-response.utils";

export const usePostDetail = () => {
  const [postData, setpostData] = useState();

  const fetchPostDetails = useCallback(async (post_id) => {
    try {
      const postById = await getPostById(post_id);
      setpostData(postById.data.post);
    } catch (err) {
      errorHandler(err);
    }
  }, []);

  return {
    postData,

    fetchPostDetails,
  };
};
