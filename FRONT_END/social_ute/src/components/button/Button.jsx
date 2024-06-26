import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import * as React from "react"
import { cn } from "utils/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-black/40 bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        icon: 'flex gap-2 text-md items-center border border-black/40 bg-background font-quick_sans font-bold',
        press:
          "appearance-none border-none bg-none cursor-pointer outline-none my-4 px-6 py-4 bg-[#ddd] tracking-wide rounded-md opacity-90 transition-opacity duration-1500 ease-in-out hover:opacity-1 shadow-button_pressed_shadow transform-gpu transition-transform duration-1500 translate-x-2 -translate-y-2 ease-in-out active:translate-x-0 active:-translate-y-0 active:shadow-none flex flex-col gap-1 overflow-hidden items-center justify-center min-w-[80px] min-h-[60px]"
      },
      size: {
        default: "h-10",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      color: {
        danger: 'bg-red/95',
        gray: 'bg-bg_gray'
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, color, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, color, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

