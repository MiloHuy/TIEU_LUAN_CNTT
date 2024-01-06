import { BUTTON_COLOR } from "constants/date-picker.const";
import { useCallback } from "react";

const RoundedButton = (
    {
        children,
        onClick,
        disabled,
        roundedFull = false,
        padding = "py-[0.55rem]",
        active = false
    }
) => {

    const getClassName = useCallback(() => {
        const darkClass = "dark:text-white/70 dark:hover:bg-white/10 dark:focus:bg-white/10";
        const activeClass = active ? "font-semibold bg-gray-50 dark:bg-white/5" : "";
        const defaultClass = !roundedFull
            ? `w-full tracking-wide ${darkClass} ${activeClass} transition-all duration-300 px-3 ${padding} uppercase hover:bg-gray-100 rounded-md focus:ring-1`
            : `${darkClass} ${activeClass} transition-all duration-300 hover:bg-gray-100 rounded-full p-[0.45rem] focus:ring-1`;
        const buttonFocusColor = BUTTON_COLOR.focus['blue']
        const disabledClass = disabled ? "line-through" : "";

        return `${defaultClass} ${buttonFocusColor} ${disabledClass}`;
    }, [disabled, padding, roundedFull, active]);

    return (
        <button type="button" className={getClassName()} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}

export default RoundedButton
