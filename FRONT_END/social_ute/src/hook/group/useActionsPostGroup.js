import { EMessGroup } from "constants/group/enum";
import { TOAST_OPTION_DEFAULT } from "constants/toast.const";
import { toast } from "react-toastify";
import { likePostGroup, storePostGroup } from "services/group/api-post.svc";
import { checkPermissionMethod } from "utils/auth.utils";
import { errorHandler } from "utils/error-response.utils";

const { useCallback, useState } = require("react");

export const useActionsPostGroup = ({
  liked_post,
  saved_posts,
  number_likes,
  permission,
  role,
}) => {
  const initStatusPost = {
    isLiked: liked_post,
    isSaved: saved_posts,
  };
  const [statusPost, setStatusPosts] = useState(initStatusPost);
  const [numberLikes, setNumberLikes] = useState(number_likes);

  const handleLikePostGroup = useCallback(
    async (postId, groupId) => {
      try {
        const url = checkPermissionMethod(permission, {
          action: "likePost",
          role,
        });

        if (!url) {
          return toast.error(
            EMessGroup.DONT_HAVE_PERMISSION,
            TOAST_OPTION_DEFAULT,
          );
        }

        setStatusPosts((prev) => ({
          ...prev,
          isLiked: !prev.isLiked,
        }));

        const data_numberLike = await likePostGroup(url, postId, groupId);

        setNumberLikes(data_numberLike.data.likes);
      } catch (err) {
        console.log(err);
        errorHandler(err);
      }
    },
    [permission, role],
  );

  const handleSavePostGroup = useCallback(
    async (postId, groupId) => {
      try {
        const url = checkPermissionMethod(permission, {
          action: "savePost",
          role,
        });

        if (!url) {
          return toast.error(
            EMessGroup.DONT_HAVE_PERMISSION,
            TOAST_OPTION_DEFAULT,
          );
        }

        setStatusPosts((prev) => ({
          ...prev,
          isSaved: !prev.isSaved,
        }));

        await storePostGroup(url, postId, groupId);
      } catch (err) {
        console.log(err);
        errorHandler(err);
      }
    },
    [permission, role],
  );

  return {
    statusPost,
    numberLikes,

    handleLikePostGroup,
    handleSavePostGroup,
  };
};
