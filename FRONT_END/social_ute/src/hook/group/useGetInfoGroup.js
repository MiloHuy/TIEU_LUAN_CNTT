import { useCallback, useState } from "react";
import { getInfoGroup } from "services/group/api-get.svc";
import { errorHandler } from "utils/error-response.utils";

export const useGetInfoGroup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [res, setRes] = useState();

  const fetchGetInfoGroup = useCallback(async (permission, gr_id) => {
    try {
      const { See } = permission;

      if (!See && !See.GET) return;

      setIsLoading(true);
      const res = await getInfoGroup(See.GET.group_info, gr_id);
      setRes(res.data.group);
      setIsLoading(false);
      return res.data;
    } catch (error) {
      setIsLoading(false);
      errorHandler(error);
    }
  }, []);

  return { fetchGetInfoGroup, isLoading, res };
};
