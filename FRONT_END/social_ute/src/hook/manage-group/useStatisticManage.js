import { EMessGroup } from "constants/group/enum";
import { TOAST_OPTION_DEFAULT } from "constants/toast.const";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { getStatisticCommentGroup, getStatisticLikeGroup, getStatisticMemberGroup, getStatisticPostGroup } from "services/group/api-get.svc";
import { checkPermissionMethod } from "utils/auth.utils";
import { errorHandler } from "utils/error-response.utils";

export const useStatistic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [res,setRes] = useState({
    countMembers: 0,
    countPosts: 0,
    countLikes: 0,
    countComments: 0,
  });

  const fetchStatisticMembersManage = useCallback(
    async (permission, role, groupId) => {
      try {
        const url = checkPermissionMethod(permission, {
          action: "statisticMember",
          role,
          manage : "manageInteract",
        });

        if (!url) {
          return toast.error(
            EMessGroup.DONT_HAVE_PERMISSION,
            TOAST_OPTION_DEFAULT,
          );
        }
        const res = await getStatisticMemberGroup(url, groupId);
        setRes((prev) => ({
          ...prev,
          countMembers: res.data.count_members,
        }));
        setIsLoading(true);
      } catch (err) {
        setIsLoading(true);
        errorHandler(err);
      }
    },
    [],
  );

  const fetchStatisticPostsManage = useCallback(
    async (permission, role, groupId) => {
      try {
        const url = checkPermissionMethod(permission, {
          action: "statisticPost",
          role,
          manage : "manageInteract",
        });

        if (!url) {
          return toast.error(
            EMessGroup.DONT_HAVE_PERMISSION,
            TOAST_OPTION_DEFAULT,
          );
        }
        const res = await getStatisticPostGroup(url, groupId);
        setRes((prev) => ({
          ...prev,
          countPosts: res.data.count_posts,
        }));
        setIsLoading(true);
      } catch (err) {
        setIsLoading(true);
        errorHandler(err);
      }
    },
    [],
  );

  const fetchStatisticLikesManage = useCallback(
    async (permission, role, groupId) => {
      try {
        const url = checkPermissionMethod(permission, {
          action: "statisticLike",
          role,
          manage : "manageInteract",
        });

        if (!url) {
          return toast.error(
            EMessGroup.DONT_HAVE_PERMISSION,
            TOAST_OPTION_DEFAULT,
          );
        }
        const res = await getStatisticLikeGroup(url, groupId);
        setRes((prev) => ({
          ...prev,
          countLikes: res.data.count_likes,
        }));
        setIsLoading(true);
      } catch (err) {
        setIsLoading(true);
        errorHandler(err);
      }
    },
    [],
  );

  const fetchStatisticCommentsManage = useCallback(
    async (permission, role, groupId) => {
      try {
        const url = checkPermissionMethod(permission, {
          action: "statisticComment",
          role,
          manage : "manageInteract",
        });

        if (!url) {
          return toast.error(
            EMessGroup.DONT_HAVE_PERMISSION,
            TOAST_OPTION_DEFAULT,
          );
        }
        const res = await getStatisticCommentGroup(url, groupId);
        setRes((prev) => ({
          ...prev,
          countComments: res.data.count_comments,
        }));
        setIsLoading(true);
      } catch (err) {
        setIsLoading(true);
        errorHandler(err);
      }
    },
    [],
  );

  return {
    isLoading,
    res,

    fetchStatisticMembersManage,
    fetchStatisticPostsManage,
    fetchStatisticLikesManage,
    fetchStatisticCommentsManage,
  };
};
