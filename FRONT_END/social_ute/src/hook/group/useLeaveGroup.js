import { ERoleNameGroup } from "constants/group/enum";
import { groupPermission } from "constants/group/permission.const";
import { useCallback, useState } from "react";
import { leaveGroup } from "services/group/api-post.svc";
import { errorHandler } from "utils/error-response.utils";

export const useLeaveGroup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLeaveGroup = useCallback(async ({ permission, groupId }) => {
    try {
      setIsLoading(true);

      const { category, method, endPoint } =
        groupPermission[ERoleNameGroup.MEMBER].leaveGroup;

      const url = permission[category][method][endPoint];

      await leaveGroup(url, groupId);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      errorHandler(error);
    }
  }, []);

  return { handleLeaveGroup, isLoading };
};
