import { ERR_POST } from "constants/error.const";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { getCommentPost, postComment } from "services/post.svc";
import { checkCodeInArray } from "utils/code-error.utils";

export const useComments = () => {
  const [comments, setComment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllComments = useCallback(async (post_id) => {
    try {
      const allCommnent = await getCommentPost(post_id);
      setComment(allCommnent.data.comments);
    } catch (error) {
      const { code } = error.response.data;

      const messageError = checkCodeInArray(ERR_POST, code);
      if (messageError) {
        toast.error(`${messageError}`, {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }, []);

  const handlePostComment = useCallback(async (post_id, commentInput) => {
    try {
      setIsLoading(true);
      await postComment(post_id, { comment_content: commentInput });

      setIsLoading(false);
    } catch (err) {
      console.log("err: " + err);
    }
  }, []);

  return {
    isLoading,
    comments,

    fetchAllComments,
    handlePostComment,
  };
};
