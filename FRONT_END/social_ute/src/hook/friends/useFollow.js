import { useCallback, useState } from "react";
import { followGuest } from "services/user.svc";

export const useFollow = (following) => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusFollow, setStatus] = useState(following);

  const handleFollow = useCallback(
    async (userId) => {
      try {
        setIsLoading(true);
        await followGuest(userId);
        setStatus(!statusFollow);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log("err:" + err);
      }
    },
    [statusFollow],
  );

  return {
    isLoading,
    statusFollow,
    handleFollow,
  };
};
