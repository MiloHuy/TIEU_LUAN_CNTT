import { ROLECHECK } from "constants/app.const";
import { ERROR_DELETE_POST } from "constants/error.const";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { deletePostAdmin } from "services/admin.svc";
import { deletePost } from "services/post/api-delete.svc";
import { errorHandler } from "utils/error-response.utils";

export const useDeletePost = ({ post_id ,role}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeletePost = useCallback(async () => {
    try {
      setIsLoading(true);

      if(role === ROLECHECK.role_user){
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
      }
      
      if( role === ROLECHECK.role_admin){
        await deletePostAdmin(post_id);

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
      }
    } catch (err) {
      setIsLoading(false);
      errorHandler(err,ERROR_DELETE_POST);
    }
  }, [post_id,role]);

  return {
    isLoading,

    handleDeletePost,
  };
};
