import { useCallback, useState } from "react";
import { getAllGroup } from "services/group/api-get.svc";
import { errorHandler } from "utils/error-response.utils";

export const useAllGroup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resDataGroup, setResDataGroup] = useState();

  const fetchAllGroup = useCallback(async (role) => {
    try {
      setIsLoading(false);
      const res = await getAllGroup(role);
      setResDataGroup(res.data.groups);

      setIsLoading(true);
    } catch (error) {
      setIsLoading(true);
      errorHandler(error);
    }
  }, []);

  return {
    isLoading,
    resDataGroup,

    fetchAllGroup,
  };
};
