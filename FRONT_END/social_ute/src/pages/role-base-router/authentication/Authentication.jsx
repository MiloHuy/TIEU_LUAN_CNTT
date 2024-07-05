import { authFail, authSuccess } from "app/slice/auth/auth.slice.js";
import PropagateLoader from "components/loading/propagate-loading/PropagateLoader";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getMeInfo } from "services/me.svc.js";
import Unauthorized from "../authorization/UnAuthorization";
import socketIOClient from "socket.io-client";
import { getAccessTokenFromCookie } from "utils/auth.utils";
import { getSocket } from "app/slice/socket/socket.slice";
import { toast } from "sonner";

export default function Authentication() {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const accessToken = getAccessTokenFromCookie();

  const fetchInfoMySelf = useCallback(async () => {
    try {
      const data_Info = await getMeInfo();
      dispatch(authSuccess({ ...data_Info.data.user }));
    } catch (err) {
      dispatch(authFail(err));
    }
  }, [dispatch]);

  const socketRef = useRef();

  const handleShowToast = (data) => {
    return toast(data.content, {
      description: "Sunday, December 03, 2023 at 9:00 AM",
    });
  };

  useEffect(() => {
    if (accessToken) {
      socketRef.current = socketIOClient.connect("http://localhost:3000", {
        extraHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(getSocket(socketRef.current));

      socketRef.current.on("getNotiForLikePost", (data) => {
        handleShowToast(data);
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    fetchInfoMySelf();
  }, [fetchInfoMySelf]);

  if (!loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <PropagateLoader color="#9aa19f" size={18} />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Outlet />;
  }
  return <Unauthorized />;
}
