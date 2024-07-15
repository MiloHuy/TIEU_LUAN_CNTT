import { EMessGroup } from "constants/group/enum";
import { TOAST_OPTION_DEFAULT } from "constants/toast.const";
import { useCallback, useState } from "react";
import { editRegulationGroup } from "services/group/api-put.svc";
import { toast } from "sonner";
import { checkPermissionMethod } from "utils/auth.utils";
import { errorHandler } from "utils/error-response.utils";

export const useEditRegulationManageGroup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleEditRegulationManage = useCallback(
    async (permission, role, groupId, regulations) => {
      try {
        setIsLoading(true);
        const url = checkPermissionMethod(permission, {
          action: "editContent",
          role,
          manage : "manageRegulation",
        });

        if (!url) {
          setIsLoading(false);
          return toast.error(
            EMessGroup.DONT_HAVE_PERMISSION,
            TOAST_OPTION_DEFAULT,
          );
        }
        await editRegulationGroup(url, groupId,{regulation: regulations});
        setIsLoading(false);

        return toast.success(
          EMessGroup.EDIT_SUCCESS,
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
    handleEditRegulationManage,
  };
}

