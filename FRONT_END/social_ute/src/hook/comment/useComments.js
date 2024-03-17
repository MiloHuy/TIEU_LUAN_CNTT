import { ERR_POST } from "constants/error.const";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { getCommentPost } from "services/post/api-get.svc";
import { checkCodeInArray } from "utils/code-error.utils";

export const useComments = () => {
  const [comments, setComment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllComments = useCallback(async (postId) => {
    try {
      setIsLoading(true);
      const allCommnent = await getCommentPost(postId);
      setComment(allCommnent.data.comments);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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

  return {
    isLoading,
    comments,

    fetchAllComments,
  };
};
