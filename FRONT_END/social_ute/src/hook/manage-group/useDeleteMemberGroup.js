import { EMessGroup } from "constants/group/enum";
import { TOAST_OPTION_DEFAULT } from "constants/toast.const";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { deleteMemberManage } from "services/group/api-delele.svc";
import { checkPermissionMethod } from "utils/auth.utils";
import { errorHandler } from "utils/error-response.utils";

export const useDeleteMemberGroup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteMemberManage = useCallback(
    async (permission, role, groupId, userId) => {
      try {
        setIsLoading(true);
        const url = checkPermissionMethod(permission, {
          action: "deleteMember",
          role,
          manage : "manageMember",
        });

        if (!url) {
          setIsLoading(false);
          return toast.error(
            EMessGroup.DONT_HAVE_PERMISSION,
            TOAST_OPTION_DEFAULT,
          );
        }
        await deleteMemberManage(url, groupId,userId);
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
    handleDeleteMemberManage,
  };
};
