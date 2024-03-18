import { useCallback, useState } from "react";
import { getPostById } from "services/post/api-get.svc";

export const usePostDetail = () => {
  const [postDetail, setPostDetail] = useState();

  const fetchPostDetails = useCallback(async (post_id) => {
    try {
      const postById = await getPostById(post_id);
      setPostDetail(postById.data.post);
    } catch (err) {}
  }, []);

  return {
    postDetail,

    fetchPostDetails,
  };
};
