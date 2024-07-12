import { useCallback, useState } from "react";
import { acceptInviteGroup, rejectInviteGroup } from "services/group/api-post.svc";
import { toast } from "sonner";

export const useActionInviteGroup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAcceptInvite = useCallback(async (groupId) => {
    try {
      setIsLoading(true);

      await acceptInviteGroup(groupId);
      toast.success("Chấp nhận thành công");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }, []);

  const handleRejectInvite = useCallback(async (groupId) => {
    try {
      setIsLoading(true);
      await rejectInviteGroup(groupId);
      setIsLoading(false);
      toast.success("Từ chối thành công");
    } catch (err) {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    handleAcceptInvite,
    handleRejectInvite,
  };
}
