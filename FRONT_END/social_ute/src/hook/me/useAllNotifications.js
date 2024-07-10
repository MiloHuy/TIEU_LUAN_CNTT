import { useCallback, useState } from "react";
import { getAllNotifications, getAllNotificationsUnread } from "services/me.svc";
import { errorHandler } from "utils/error-response.utils";

export const useAllNotifications = () => {
  const [res, setRes] = useState(true);

    const fetchNotifications = useCallback(async () => {
      try {
        setRes(undefined);
        const res = await getAllNotifications();
        setRes(res.data);
      } catch (error) {
        errorHandler(error);
      }
    }, []);

    const fetchNotificationsUnread = useCallback(async () => {
      try {
        setRes(undefined);
        const res = await getAllNotificationsUnread();
        setRes(res.data);
      } catch (error) {
        errorHandler(error);
      }
    }, []);

  return { ...res ,fetchNotifications,fetchNotificationsUnread};
}
