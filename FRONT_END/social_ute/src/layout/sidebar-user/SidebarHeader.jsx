import { clsx } from "clsx";
import { useNavigate } from "react-router-dom";

const SidebarHeader = (props) => {
  const navigate = useNavigate();

  return (
    <div className={clsx("flex justify-center", props.className)}>
      <div
        className={clsx(
          "flex flex-col items-center mr-3 justify-center mt-3 cursor-pointer",
          props.className
        )}
        onClick={() => navigate("/welcome")}
      >
        <h1 className="text-3xl text-black dark:text-white font-extrabold font-young_serif text-center">
          SOCIAL
        </h1>
        <h1 className="text-3xl text-black dark:text-white font-extrabold font-young_serif text-center">
          HCMUTE
        </h1>
      </div>
    </div>
  );
};

export default SidebarHeader;
