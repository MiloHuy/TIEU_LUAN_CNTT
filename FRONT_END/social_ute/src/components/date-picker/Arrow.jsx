import { forwardRef } from "react";

export const Arrow = forwardRef((props, ref) => {
    return (
        <div
            ref={ref}
            className="absolute z-20 h-4 w-4 rotate-45 mt-0.5 ml-[1.2rem] border-l border-t border-gray-300 bg-white dark:bg-slate-800 dark:border-slate-600"
        />
    );
});
