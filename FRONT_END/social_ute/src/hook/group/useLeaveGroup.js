import { EMessGroup } from "constants/group/enum";
import { useCallback, useState } from "react";
import { leaveGroup } from "services/group/api-post.svc";
import { toast } from "sonner";
import { checkPermissionMethod } from "utils/auth.utils";
import { errorHandler } from "utils/error-response.utils";

export const useLeaveGroup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLeaveGroup = useCallback(async (permission,role, groupId ) => {
    try {
      setIsLoading(true);

      const url = checkPermissionMethod(permission, {
        action: "leaveGroup",
        role,
      });

      if (!url) {
        setIsLoading(false);
        return toast.error(EMessGroup.DONT_HAVE_PERMISSION);
      }

      await leaveGroup(url, groupId);
      setIsLoading(false);
      toast.success(EMessGroup.LEAVE_GROUP_SUCCESS);
      setTimeout(() => {
        window.location.reload();
      },1000);
    } catch (error) {
      setIsLoading(false);
      errorHandler(error);
    }
  }, []);

  return { handleLeaveGroup, isLoading };
};
