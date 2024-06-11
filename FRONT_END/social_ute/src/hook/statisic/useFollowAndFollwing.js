import { useCallback, useState } from "react";
import { statistics } from "services/user.svc";

export const useFollowAndFollwing = (userId) => {
  const [userStatisics, setUserStatisics] = useState();

  const fetchUserStatisics = useCallback(async () => {
    try {
      const statisics = await statistics(userId);
      setUserStatisics(statisics.data);
    } catch (error) {
      const { code } = error.response.data;
    }
  }, [userId]);

  return {
    userStatisics,
    fetchUserStatisics,
  };
};
