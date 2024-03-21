import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { unFriend } from "services/user.svc";

export const useUnfriend = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUnFriend = useCallback(async (userId) => {
    try {
      setIsLoading(true);
      await unFriend(userId);

      setIsLoading(false);
      toast.success("Hủy kết bạn thành công!!!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      console.log("err :" + err);

      toast.error("Hủy kết bạn thất bạn!!!", {
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
  }, []);

  return {
    isLoading,

    handleUnFriend,
  };
};
