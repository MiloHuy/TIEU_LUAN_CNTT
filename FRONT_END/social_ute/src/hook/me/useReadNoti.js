import { useCallback, useState } from "react";
import { readNofications } from "services/nofication.svc";

export const useReadNoti = () => {
  const [isLoading,setIsLoading] = useState(false);

  const handleReadNotification = useCallback(async (notiId) => {
    try {
      setIsLoading(true);
      await readNofications(notiId);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // errorHandler(error);
    }
  }, []);

  return { isLoading, handleReadNotification };
}
