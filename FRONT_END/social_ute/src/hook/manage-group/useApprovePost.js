import { EMessGroup } from "constants/group/enum";
import { TOAST_OPTION_DEFAULT } from "constants/toast.const";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import {  approvePostGroup  } from "services/group/api-get.svc";
import { checkPermissionMethod } from "utils/auth.utils";
import { errorHandler } from "utils/error-response.utils";

export const useApprovePost = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleApprovePost = useCallback(
    async (permission, role, groupId,postId) => {
      try {
        setIsLoading(true);
        const url = checkPermissionMethod(permission, {
          action: "approvePost",
          role,
          manage : "managePost",
        });

        if (!url) {
          setIsLoading(false);
          return toast.error(
            EMessGroup.DONT_HAVE_PERMISSION,
            TOAST_OPTION_DEFAULT,
          );
        }
        await approvePostGroup(url, groupId,postId);
        setIsLoading(false);

        return toast.success(
          'Đã duyệt thành công',
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
    handleApprovePost,
  };
};
