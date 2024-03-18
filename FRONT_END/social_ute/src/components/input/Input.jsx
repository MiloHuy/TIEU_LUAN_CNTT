import { extendVariants, Input } from "@nextui-org/react";

const MyInput = extendVariants(Input, {
    variants: {
        color: {
            stone: {
                inputWrapper: [
                    "bg-white",
                    "border",
                    "border-black",
                    "shadow",
                    "transition-colors",
                    "focus-within:bg-primary",
                    "data-[hover=true]:border-zinc-600",
                    "data-[hover=true]:bg-zinc-100",
                    "group-data-[focus=true]:border-zinc-600",
                    // dark theme
                    "dark:bg-black",
                    "dark:border-white",
                    "dark:data-[hover=true]:bg-zinc-900",
                    "dark:focus-within:bg-zinc-900",
                ],
                input: [  // <- Input element slot
                    "text-black",
                    "placeholder:text-zinc-600",
                    // dark theme
                    "dark:text-white",
                    "dark:placeholder:text-zinc-600",
                ],
            },
        },
        size: {
            xs: {
                inputWrapper: "h-unit-6 min-h-unit-6 px-1",
                input: "text-tiny",
            },
            md: {
                inputWrapper: "h-unit-10 min-h-unit-10",
                input: "text-small",
            },
            xl: {
                inputWrapper: "h-unit-14 min-h-unit-14",
                input: "text-medium",
            },
        },
        radius: {
            xs: {
                inputWrapper: "rounded",
            },
            sm: {
                inputWrapper: "rounded-[8px]",
            },
            lg: {
                inputWrapper: "rounded-[15px]",
            }
        },
        textSize: {
            base: {
                input: "text-base",
            },
        },
        removeLabel: {
            true: {
                label: "hidden",
            },
            false: {},
        },
    },
    defaultVariants: {
        color: "stone",
        textSize: "base",
        removeLabel: true,
    },
});

export default MyInput
