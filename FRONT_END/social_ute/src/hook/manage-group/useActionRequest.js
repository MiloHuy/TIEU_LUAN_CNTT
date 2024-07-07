import { EMessGroup } from "constants/group/enum";
import { TOAST_OPTION_DEFAULT } from "constants/toast.const";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { acceptRequestJoinGroup  } from "services/group/api-get.svc";
import { checkPermissionMethod } from "utils/auth.utils";
import { errorHandler } from "utils/error-response.utils";

export const useActionRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [res,setRes] = useState();

  const handleAcceptRequest = useCallback(
    async (permission, role, groupId,userId) => {
      try {
        setIsLoading(true);
        const url = checkPermissionMethod(permission, {
          action: "acceptRequest",
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
        await acceptRequestJoinGroup(url, groupId,userId);
        setIsLoading(false);

        return toast.success(
          'Đã chấp nhận yêu cầu tham gia nhóm thành công',
          TOAST_OPTION_DEFAULT,
        );
      } catch (err) {
        setIsLoading(false);
        errorHandler(err);
      }
    },
    [],
  );

  const handleRejectRequest = useCallback(
    async (permission, role, groupId,userId) => {
      try {
        setIsLoading(true);
        const url = checkPermissionMethod(permission, {
          action: "refuseRequest",
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
        const res = await acceptRequestJoinGroup(url, groupId,userId);
        setRes(res.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        errorHandler(err);
      }
    },
    [],
  );

  return {
    isLoading,
    ...res,

    handleAcceptRequest,
    handleRejectRequest,
  };
};
