import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { deletePost } from "services/post/api-delete.svc";

export const useDeletePost = ({ post_id }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeletePost = useCallback(async () => {
    try {
      setIsLoading(true);
      await deletePost(post_id);

      toast.success("Xóa bài viết thành công!!!", {
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
      toast.error("Xóa bài viết thất bại!!!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [post_id]);

  return {
    isLoading,

    handleDeletePost,
  };
};
