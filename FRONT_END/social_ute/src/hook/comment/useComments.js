import { EMessGroup } from "constants/group/enum";
import { TOAST_OPTION_DEFAULT } from "constants/toast.const";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { getAllCommentPostGroup } from "services/group/api-get.svc";
import { getCommentPost } from "services/post/api-get.svc";
import { checkPermissionMethod } from "utils/auth.utils";
import { errorHandler } from "utils/error-response.utils";

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
    }
  }, []);

  const fetchCommentGroup = useCallback(
    async (permission, role, postId, groupId) => {
      try {
        const url = checkPermissionMethod(permission, {
          action: "allComment",
          role,
        });

        if (!url)
          return toast.error(
            EMessGroup.DONT_HAVE_PERMISSION,
            TOAST_OPTION_DEFAULT,
          );
        setIsLoading(true);
        const allCommnent = await getAllCommentPostGroup(url, postId, groupId);
        setComment(allCommnent.data.comments);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        errorHandler(error);
      }
    },
    [],
  );

  return {
    isLoading,
    comments,

    fetchAllComments,
    fetchCommentGroup,
  };
};
