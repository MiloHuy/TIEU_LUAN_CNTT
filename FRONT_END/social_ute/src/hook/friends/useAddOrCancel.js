import { useCallback, useState } from "react";
import { AddCancelFriend } from "services/user.svc";

export const useAddOrCancel = (addFriend) => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusAddOrCancelFriend, setStatus] = useState(addFriend);

  const handleAddOrCancelFriend = useCallback(
    async (userId) => {
      try {
        setIsLoading(true);
        await AddCancelFriend(userId);
        setStatus(!statusAddOrCancelFriend);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log("err:" + err);
      }
    },
    [statusAddOrCancelFriend],
  );

  return {
    isLoading,
    statusAddOrCancelFriend,
    handleAddOrCancelFriend,
  };
};
