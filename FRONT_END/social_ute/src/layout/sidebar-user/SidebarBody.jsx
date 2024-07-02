import clsx from "clsx";
import { Button } from "components/button";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { renderButtonsSidebar, renderButtonsSidebarUser } from "./utils";
import { selectSocketData } from "app/slice/socket/socket.slice";

const SidebarButton = ({
  className,
  Icon,
  text,
  onClick,
  isShortCutSidebar,
}) => (
  <Button
    className={clsx("flex items-center justify-center h-[50px]", className)}
    variant="ghost"
    onClick={onClick}
  >
    <Icon size={24} strokeWidth={1.5} />
    {isShortCutSidebar ? "" : <p className="font-quick_sans text-xl">{text}</p>}
  </Button>
);

const SidebarBody = (props) => {
  const { className, userID, isShortCutSidebar } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const classBaseButton =
    "w-full flex justify-start gap-3 items-center px-4 border-b hover:scale-105";

  const buttons = useMemo(
    () => renderButtonsSidebarUser(navigate, userID, dispatch),
    [navigate, userID, dispatch]
  );

  return (
    <div className={clsx("w-full mt-4", className)}>
      <div className="flex flex-col gap-3 justify-between">
        {buttons.map((button, index) =>
          button.isModal ? (
            <button.ModalComponent
              key={index}
              {...button.modalProps}
              trigger={
                <SidebarButton
                  className={classBaseButton}
                  Icon={button.Icon}
                  text={button.text}
                  isShortCutSidebar={isShortCutSidebar}
                />
              }
            />
          ) : (
            <SidebarButton
              key={index}
              className={classBaseButton}
              Icon={button.Icon}
              text={button.text}
              onClick={button.onClick}
              isShortCutSidebar={isShortCutSidebar}
            />
          )
        )}
      </div>
    </div>
  );
};

export default SidebarBody;
