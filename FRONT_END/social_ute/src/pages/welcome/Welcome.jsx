import clsx from "clsx";
import SidebarUser from "layout/sidebar-user";
import { CircleChevronLeft } from "lucide-react";
import { useCallback, useState } from "react";
import { Outlet } from "react-router";
import Cookies from "js-cookie";
import { getUserIdFromCookie } from "utils/user.utils";
import { MODEAPP } from "constants/app.const";

const Welcome = () => {
  const mode = Cookies.get("mode");
  const [darkmode, setDarkMode] = useState(mode ?? MODEAPP.light);

  const handleDarkMode = useCallback((value) => {
    setDarkMode(value);
    console.log(value);
    Cookies.set("mode", value, { expires: 1 });
  }, []);

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
          `${isShortCutSidebar ? "left-[80px]" : "left-[220px]"}`
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
          isShortCutSidebar === true ? "min-w-[95vw] w-[95vw]" : "min-w-[85vw]"
        } ${darkmode} overflow-auto`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Welcome;
