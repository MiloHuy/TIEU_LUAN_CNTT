import { useCallback, useState } from "react";
import { getPostById } from "services/post.svc";

export const usePostDetail = ({ post_id }) => {
  const [postDetail, setPostDetail] = useState();

  const fetchPostDetails = useCallback(async () => {
    try {
      const postById = await getPostById(post_id);
      setPostDetail(postById.data.post);
    } catch (err) {}
  }, [post_id]);

  return {
    postDetail,

    fetchPostDetails,
  };
};
