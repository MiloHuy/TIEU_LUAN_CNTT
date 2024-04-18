import { Label } from "components/label"
import * as React from "react"
import { cn } from "utils/lib/utils"

const InputV2 = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-black/90 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          "dark:border-white",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
InputV2.displayName = "InputV2"

const InputWithLabel = React.forwardRef(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div
        className={cn(
          'w-full flex flex-row gap-2 items-center',
          className
        )}>
        <Label
          className="text-white h-15 text-lg font-quick_sans w-[7rem]"
          ref={ref}
          {...props}
        >
          {label}
        </Label>

        <InputV2
          className='text-white h-15 text-lg font-quick_sans flex-1'
          type={type}
          ref={ref}
          {...props}
        />
      </div >
    )
  }
)

export { InputV2, InputWithLabel }

