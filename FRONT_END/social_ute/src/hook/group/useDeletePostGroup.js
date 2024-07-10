import { TOAST_OPTION_DEFAULT } from "constants/toast.const";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { deletePostGroup } from "services/group/api-delele.svc";
import { errorHandler } from "utils/error-response.utils";

export const useDeletePostGroup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeletePostGroup = useCallback(
    async (url,groupId,postId) => {
      try {
        setIsLoading(true);
        await deletePostGroup(url, groupId,postId);
        setIsLoading(false);

        return toast.success(
          'Đã xóa bài viết thành công',
          TOAST_OPTION_DEFAULT,
        );
      } catch (err) {
        setIsLoading(false);
        errorHandler(err);
      }
    },
    [],
  );

  return {
    isLoading,

    handleDeletePostGroup,
  };
};
