import { useCallback, useState } from "react";
import { getUserSearch } from "services/user.svc";

export const useSearchUser = () => {
  const [userSearch, setUserSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchSearchUser = useCallback(async (page, pageSize, search) => {
    try {
      setIsLoading(true);
      const initialData = await getUserSearch({
        page: page,
        size: pageSize + 3,
        search: search,
      });

      setUserSearch(initialData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, []);

  return {
    userSearch,
    isLoading,
    fetchSearchUser,
  };
};
