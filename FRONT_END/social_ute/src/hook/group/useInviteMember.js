import { useCallback, useState } from "react";
import { inviteMember } from "services/group/api-post.svc";
import { errorHandler } from "utils/error-response.utils";

export const useInviteMember = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleInviteMember = useCallback(
    async (permission, groupId, userId) => {
      try {
        setIsLoading(true);

        const { Invite } = permission;

        await inviteMember(Invite.POST.invite, groupId, userId);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
        errorHandler(error);
      }
    },
    [],
  );

  return { handleInviteMember, isLoading };
};
