import { useCallback, useState } from "react";
import { getUserSearch } from "services/user.svc";

export const useSearchUser = () => {
  const [resultSearch, setResultSearch] = useState({
    totalUser: 0,
    totalGroup: 0,
    groups: [],
    users: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchSearch = useCallback(async (page, pageSize, search) => {
    try {
      setIsLoading(true);

      const data = await getUserSearch({
        page: page,
        size: pageSize + 3,
        search: search,
      });

      setResultSearch((prev) => ({
        ...prev,
        users: data.data.users,
        groups: data.data.groups,
        totalUser: data.data.total_user,
        totalGroup: data.data.total_group,
      }));

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, []);

  return {
    resultSearch,
    isLoading,
    fetchSearch,
  };
};
