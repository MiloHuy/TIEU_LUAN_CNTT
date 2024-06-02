import { selectRolePermission } from "app/slice/group/group.slice";
import { ERoleNameGroup } from "constants/group/enum";
import { groupPermission } from "constants/group/permission.const";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { getAllRegulations } from "services/group/api-get.svc";
import { errorHandler } from "utils/error-response.utils";

export const useGetAllRegulations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resData, setResData] = useState();
  const rolePermission = useSelector(selectRolePermission);
  const { permission } = rolePermission;

  const fetchAllRegulations = useCallback(
    async (groupId) => {
      try {
        const { category, method, endPoint } =
          groupPermission[ERoleNameGroup.SUPERADMIN].groupRegulations;

        const url = permission[category][method][endPoint];

        const res = await getAllRegulations(url, groupId);
        setResData(res.data.regulation);

        setIsLoading(true);
      } catch (error) {
        setIsLoading(true);
        errorHandler(error);
      }
    },
    [permission],
  );

  return {
    isLoading,
    resData,

    fetchAllRegulations,
  };
};
