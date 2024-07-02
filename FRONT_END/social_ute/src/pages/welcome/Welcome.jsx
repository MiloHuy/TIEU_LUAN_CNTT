import clsx from "clsx";
import SidebarUser from "layout/sidebar-user";
import { CircleChevronLeft } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router";
import { getUserIdFromCookie } from "utils/user.utils";

const Welcome = () => {
  const [darkmode, setDarkMode] = useState("light");

  const handleDarkMode = (value) => {
    setDarkMode(value);
  };

  const [isShortCutSidebar, setShortCutSidebar] = useState(false);

  const handleShortCutSidebar = () => {
    setShortCutSidebar(!isShortCutSidebar);
  };

  const Id = getUserIdFromCookie();

  return (
    <div className={`flex bg-background text-primary ${darkmode}`}>
      <CircleChevronLeft
        size={26}
        strokeWidth={1}
        className={clsx(
          "absolute cursor-pointer top-2 transform duration-500 ease-in-out",
          { "rotate-180 ": isShortCutSidebar },
          `${isShortCutSidebar ? "left-[80px]" : "left-[240px]"}`
        )}
        onClick={handleShortCutSidebar}
      />

      <SidebarUser
        userID={Id}
        isShortCutSidebar={isShortCutSidebar}
        handleController={handleDarkMode}
      />

      <div
        className={`${
          isShortCutSidebar === true ? "min-w-[95vw] w-[95vw]" : "min-w-[80vw]"
        } ${darkmode} overflow-auto`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Welcome;
