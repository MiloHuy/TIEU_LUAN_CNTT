import { useCallback, useState } from "react";
import { requestJoinGroup } from "services/group/api-post.svc";
import { errorHandler } from "utils/error-response.utils";

export const useRequestJoinGroup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestJoinGroup = useCallback(async ({ url, groupId,userId }) => {
    try {
      setIsLoading(true);

      await requestJoinGroup(url, groupId,userId);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      errorHandler(error);
    }
  }, []);

  return { handleRequestJoinGroup, isLoading };
}
