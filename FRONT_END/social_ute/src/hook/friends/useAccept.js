import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { AcceptFriend } from "services/user.svc";

export const useAccept = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAcceptFriend = useCallback(async (userId) => {
    try {
      setIsLoading(true);
      await AcceptFriend(userId);

      setIsLoading(false);

      toast.success("Thao tác thành công.", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      window.location.reload();
    } catch (err) {
      console.log("err:" + err);

      toast.error("Thao tác thất bại.", {
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
    handleAcceptFriend,
  };
};
