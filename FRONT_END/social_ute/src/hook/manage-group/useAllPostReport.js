import { EMessGroup } from "constants/group/enum";
import { TOAST_OPTION_DEFAULT } from "constants/toast.const";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import {  allPostsReportManageGroup } from "services/group/api-get.svc";
import { checkPermissionMethod } from "utils/auth.utils";
import { errorHandler } from "utils/error-response.utils";

export const useAllPostReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [res,setRes] = useState();

  const fetchAllPostsReportManage = useCallback(
    async (permission, role, groupId) => {
      try {
        const url = checkPermissionMethod(permission, {
          action: "allReportPosts",
          role,
          manage : "managePost",
        });

        if (!url) {
          return toast.error(
            EMessGroup.DONT_HAVE_PERMISSION,
            TOAST_OPTION_DEFAULT,
          );
        }
        const res = await allPostsReportManageGroup(url, groupId);
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

    fetchAllPostsReportManage,
  };
};
