import { useCallback, useState } from "react";
import { inviteMember } from "services/group/api-post.svc";
import { toast } from "sonner";
import { errorHandler } from "utils/error-response.utils";

export const useInviteMember = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleInviteMember = useCallback(async ({ url, groupId, userId }) => {
    try {
      setIsLoading(true);

      await inviteMember(url, groupId, userId);
      setIsLoading(false);
      toast.success("Mời thành công");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      errorHandler(error);
    }
  }, []);

  return { handleInviteMember, isLoading };
};
