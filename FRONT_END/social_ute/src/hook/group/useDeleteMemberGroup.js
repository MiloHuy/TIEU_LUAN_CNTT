import { EMessGroup, ERoleNameGroup } from "constants/group/enum";
import { groupPermission } from "constants/group/permission.const";
import { TOAST_OPTION_DEFAULT } from "constants/toast.const";
import { useCallback, useState } from "react";
import { deleteMemberGroup } from "services/group/api-delele.svc";
import { toast } from "sonner";
import { errorHandler } from "utils/error-response.utils";

export const useDeleteMemberGroup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteMember = useCallback(async (permission, groupId, memberId) => {
    try {
      const { category, method, endPoint } =
        groupPermission[ERoleNameGroup.SUPERADMIN].manageMember.deleteMember;

      const url = permission[category][method][endPoint];
      if (!url) {
        return toast.error(
          EMessGroup.DONT_HAVE_PERMISSION,
          TOAST_OPTION_DEFAULT,
        );
      }

      setIsLoading(true);
      await deleteMemberGroup(url, groupId, memberId);
      setIsLoading(false);
      toast.success(EMessGroup.DELETE_MEMBER_SUCCESS);
    } catch (error) {
      setIsLoading(false);
      errorHandler(error);
    }
  }, []);

  return { isLoading, handleDeleteMember };
}
