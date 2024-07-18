import { EMessGroup } from "constants/group/enum";
import { TOAST_OPTION_DEFAULT } from "constants/toast.const";
import { useCallback, useState } from "react";
import { editActiveMemberManage } from "services/group/api-put.svc";
import { toast } from "sonner";
import { checkPermissionMethod } from "utils/auth.utils";
import { errorHandler } from "utils/error-response.utils";

export const useEditActiveMember = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleEditMemberManage = useCallback(
    async (permission, role, groupId, userId) => {
      try {
        setIsLoading(true);
        const url = checkPermissionMethod(permission, {
          action: "editActive",
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
        await editActiveMemberManage(url, groupId,userId);
        setIsLoading(false);

        return toast.success(
          'Chỉnh sửa thành công',
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
    handleEditMemberManage,
  };
};
