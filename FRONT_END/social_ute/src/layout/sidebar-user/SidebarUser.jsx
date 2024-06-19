import clsx from "clsx";
import { IconSideBarUser } from "constants/icons.const";
import SidebarShortCut from "layout/sidebar-short-cut/SidebarShortCut";
import { useMemo } from "react";
import SidebarBody from "./SidebarBody";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";

const SidebarUser = (props) => {
  const { userID, isShortCutSidebar } = props;

  const handleController = (value) => {
    props.handleController(value);
  };

  const clsBaseSidebar = "fixed transform duration-700 ease-in-out";

  const widthSidebar = useMemo(() => {
    return isShortCutSidebar ? "min-w-[5vw] w-[5vw]" : "min-w-[20vw] w-[20vw]";
  }, [isShortCutSidebar]);

  const clsSideBarBody = useMemo(() => {
    return isShortCutSidebar
      ? " opacity-0 left-[18vw] "
      : " opacity-100 left-0 ";
  }, [isShortCutSidebar]);

  const clsSideBarShortCut = useMemo(() => {
    return isShortCutSidebar ? " opacity-100 left-[0vw] " : " opacity-0 ";
  }, [isShortCutSidebar]);

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 min-h-[100vh] border-r border-black dark:border-white overflow-auto no-scrollbar",
        widthSidebar,
        "transform duration-500 ease-out",
        props.className
      )}
    >
      <SidebarHeader
        className="w-full h-[10vh]"
        isShortCutSidebar={isShortCutSidebar}
      />

      <div className="mt-4">
        <SidebarBody
          userID={userID}
          className={clsBaseSidebar + clsSideBarBody + "px-2"}
        />

        <SidebarShortCut
          userID={userID}
          icons={IconSideBarUser}
          className={clsBaseSidebar + clsSideBarShortCut}
        />
      </div>

      <SidebarFooter
        handleSwitch={handleController}
        className="absolute bottom-0 w-full h-[5vh] left-2"
      />
    </div>
  );
};

export default SidebarUser;
