import { useCallback, useState } from "react";
import { RefuseRequest } from "services/user.svc";

export const useRefused = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefusedFriend = useCallback(async (userId) => {
    try {
      setIsLoading(true);
      await RefuseRequest(userId);

      setIsLoading(false);

      window.location.reload();
    } catch (err) {
      setIsLoading(false);
      console.log("err:" + err);
    }
  }, []);

  return {
    isLoading,

    handleRefusedFriend,
  };
};
