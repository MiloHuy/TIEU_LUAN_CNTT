import { useCallback, useState } from "react";
import { inviteMember } from "services/group/api-post.svc";
import { errorHandler } from "utils/error-response.utils";

export const useInviteMember = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleInviteMember = useCallback(async ({ url, groupId, userId }) => {
    console.log("userId", userId);
    try {
      setIsLoading(true);

      await inviteMember(url, groupId, userId);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      errorHandler(error);
    }
  }, []);

  return { handleInviteMember, isLoading };
};
