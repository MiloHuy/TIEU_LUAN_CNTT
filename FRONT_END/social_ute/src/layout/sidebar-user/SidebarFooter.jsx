import clsx from "clsx";
import Switch from "components/switch";
import { MODEAPP } from "constants/app.const";
import { useMemo, useState } from "react";
import Cookies from "js-cookie";

const SidebarFooter = (props) => {
  const { className } = props;
  const mode = Cookies.get("mode");
  const [isSelected, setIsSelected] = useState(mode === MODEAPP.light);

  useMemo(() => {
    if (isSelected === true) props.handleSwitch(MODEAPP.light);
    else props.handleSwitch(MODEAPP.dark);
  }, [isSelected, props]);

  return (
    <div className={clsx("", className)}>
      <Switch
        className="dark:bg-white"
        checked={isSelected}
        onCheckedChange={() => setIsSelected(!isSelected)}
      />
    </div>
  );
};

export default SidebarFooter;
