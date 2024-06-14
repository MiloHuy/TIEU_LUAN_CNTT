import { EMessGroup } from "constants/group/enum";
import { TOAST_OPTION_DEFAULT } from "constants/toast.const";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { getPostDetailGroup } from "services/group/api-get.svc";
import { checkPermissionMethod } from "utils/auth.utils";
import { errorHandler } from "utils/error-response.utils";

export const usePostDetailGroup = (permission, role) => {
  const [isLoading, setIsLoading] = useState(false);
  const [postDetail, setPostDetail] = useState();

  const fetchPostDetailsGroup = useCallback(
    async (postId, groupId) => {
      try {
        const url = checkPermissionMethod(permission, {
          action: "detailPost",
          role,
        });

        if (!url) {
          return toast.error(
            EMessGroup.DONT_HAVE_PERMISSION,
            TOAST_OPTION_DEFAULT,
          );
        }
        const postById = await getPostDetailGroup(url, postId, groupId);
        setPostDetail(postById.data.post);
        setIsLoading(true);
      } catch (err) {
        setIsLoading(true);
        errorHandler(err);
      }
    },
    [permission, role],
  );

  return {
    isLoading,
    postDetail,

    fetchPostDetailsGroup,
  };
};
