import { ERROR_CHANGE_PRIVACY } from "constants/error.const";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { updatePrivacyPost } from "services/post/api-put.svc";
import { errorHandler } from "utils/error-response.utils";

export const usePrivacyPost = ({ post_id }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePrivacyPost = useCallback(
    async (privacy) => {
      try {
        setIsLoading(true);
        await updatePrivacyPost(post_id, { privacy: privacy });

        toast.success("Thay đổi phạm vi thành công.", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsLoading(false);

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (err) {
        setIsLoading(false);
        errorHandler(err,ERROR_CHANGE_PRIVACY);
      }
    },
    [post_id],
  );

  return {
    isLoading,

    handleChangePrivacyPost,
  };
};
