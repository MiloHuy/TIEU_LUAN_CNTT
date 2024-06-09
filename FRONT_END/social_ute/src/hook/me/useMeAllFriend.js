import { useCallback, useState } from "react";
import { getListFriends } from "services/me.svc";
import { errorHandler } from "utils/error-response.utils";

export const useMeAllFriend = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [friends, setFriends] = useState([]);

  const fetchMeFriends = useCallback(async () => {
    try {
      setIsLoading(true);
      const dataFriends = await getListFriends();
      setFriends(dataFriends.data.friends);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      errorHandler(error);
    }
  }, []);

  return {
    friends,
    isLoading,
    fetchMeFriends,
  };
};
