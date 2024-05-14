import { getRolePermissionGroup } from "app/slice/group/group.slice";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { getRolePermission } from "services/group/api-get.svc";
import { errorHandler } from "utils/error-response.utils";

export const useGetRolePermission = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resDataRolePermission, setResDataRolePermission] = useState();
  const dispatch = useDispatch();

  const fetchRolePermission = useCallback(
    async (groupId) => {
      try {
        setIsLoading(false);
        const res = await getRolePermission(groupId);
        setResDataRolePermission(res.data.role_permisson);

        dispatch(getRolePermissionGroup(res.data.role_permisson));
        setIsLoading(true);
      } catch (error) {
        setIsLoading(true);
        console.error("Failed to fetch role permission: ", error);
        errorHandler(error);
      }
    },
    [dispatch],
  );

  return {
    isLoading,
    resDataRolePermission,

    fetchRolePermission,
  };
};
