import clsx from "clsx";
import { useEffect, useMemo } from "react";
import SidebarBody from "./SidebarBody";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import SidebarManageGroup from "layout/sidebar-manage-group";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSocketData } from "app/slice/socket/socket.slice";

const SidebarUser = (props) => {
  const { userID, isShortCutSidebar } = props;
  const location = useLocation();
  const isManageGroupPage = location.pathname.includes("manageGroup");
  const socket = useSelector(selectSocketData);

  const handleController = (value) => {
    props.handleController(value);
  };

  const clsBaseSidebar = " transform duration-700 ease-in-out";

  const widthSidebar = useMemo(() => {
    return isShortCutSidebar
      ? "min-w-[80px] w-[85px]"
      : "min-w-[200px] w-[240px]";
  }, [isShortCutSidebar]);

  useEffect(() => {
    socket.on("getNotiForLikePost", (data) => {
      console.log("getNotiForLikePost", data);
    });

    return () => {
      socket.off("getNotiForLikePost");
    };
  }, [socket]);

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 h-[100vh] border-r border-black dark:border-white overflow-auto no-scrollbar relative",
        widthSidebar,
        "transform duration-500 ease-out",
        props.className
      )}
    >
      <SidebarHeader
        className="w-full h-[80px]"
        isShortCutSidebar={isShortCutSidebar}
      />

      {isManageGroupPage ? (
        <SidebarManageGroup />
      ) : (
        <SidebarBody
          userID={userID}
          className={clsBaseSidebar}
          isShortCutSidebar={isShortCutSidebar}
        />
      )}

      <SidebarFooter
        handleSwitch={handleController}
        className="absolute bottom-4 flex justify-center w-full"
      />
    </div>
  );
};

export default SidebarUser;
