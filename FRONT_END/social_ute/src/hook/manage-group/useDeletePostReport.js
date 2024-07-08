import { EMessGroup } from "constants/group/enum";
import { TOAST_OPTION_DEFAULT } from "constants/toast.const";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { deleteReportPostGroup  } from "services/group/api-get.svc";
import { checkPermissionMethod } from "utils/auth.utils";
import { errorHandler } from "utils/error-response.utils";

export const useDeletePostReport = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteReportPost = useCallback(
    async (permission, role, groupId, reportId) => {
      try {
        setIsLoading(true);
        const url = checkPermissionMethod(permission, {
          action: "deleteReport",
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
        await deleteReportPostGroup(url, groupId,reportId);
        setIsLoading(false);

        return toast.success(
          'Đã xóa thành công',
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
    handleDeleteReportPost,
  };
};
