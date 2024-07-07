import { EMessGroup } from "constants/group/enum";
import { TOAST_OPTION_DEFAULT } from "constants/toast.const";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { allPostsManageGroup } from "services/group/api-get.svc";
import { checkPermissionMethod } from "utils/auth.utils";
import { errorHandler } from "utils/error-response.utils";

export const useAllPostsApprove = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [res,setRes] = useState();

  const fetchAllPostsApproveManage = useCallback(
    async (permission, role, groupId) => {
      try {
        const url = checkPermissionMethod(permission, {
          action: "allPostWaitApprove",
          role,
          manage : "managePost",
        });

        if (!url) {
          return toast.error(
            EMessGroup.DONT_HAVE_PERMISSION,
            TOAST_OPTION_DEFAULT,
          );
        }
        const res = await allPostsManageGroup(url, groupId);
        setRes(res.data);
        setIsLoading(true);
      } catch (err) {
        setIsLoading(true);
        errorHandler(err);
      }
    },
    [],
  );

  return {
    isLoading,
    ...res,

    fetchAllPostsApproveManage,
  };
};
