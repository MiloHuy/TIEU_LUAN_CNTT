import { useCallback, useState } from "react";
import { getListFriends } from "services/me.svc";

export const useMeAllFriend = () => {
  const [friends, setFriends] = useState([]);

  const fetchMeFriends = useCallback(async () => {
    try {
      const dataFriends = await getListFriends();
      setFriends(dataFriends.data.friends);
    } catch (error) {
      console.log("Error: ", error.response.data);
    }
  }, []);

  return {
    friends,

    fetchMeFriends,
  };
};
