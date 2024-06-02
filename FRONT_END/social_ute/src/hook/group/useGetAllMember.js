import { ERoleNameGroup } from "constants/group/enum";
import { groupPermission } from "constants/group/permission.const";
import { useCallback, useState } from "react";
import { getAllMember } from "services/group/api-get.svc";
import { errorHandler } from "utils/error-response.utils";

export const useGetAllMember = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resData, setResData] = useState();

  const fetchAllMember = useCallback(async (permission, groupId) => {
    try {
      const { category, method, endPoint } =
        groupPermission[ERoleNameGroup.MEMBER].allMember;

      const url = permission[category][method][endPoint];

      const res = await getAllMember(url, groupId);
      setResData(res.data.members);

      setIsLoading(true);
    } catch (error) {
      setIsLoading(true);
      errorHandler(error);
    }
  }, []);

  return {
    isLoading,
    resData,

    fetchAllMember,
  };
};
