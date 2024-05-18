import * as React from "react"

import { cn } from "@styles"

import { Input } from "@shad"

type PrefixedInputProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    startAdornment: JSX.Element
  }

export const PrefixedInput = React.forwardRef<
  HTMLInputElement,
  PrefixedInputProps
>(({ className, type, startAdornment, ...props }, ref) => {
  return (
    <div className="flex items-center rounded-md border">
      <div className="py-[10px] px-3 rounded-l-md text-muted-foreground bg-gray-100 border-r-gray-200 border-r-[1px]">
        {startAdornment}
      </div>
      <Input
        ref={ref}
        type={type}
        className={cn(
          "bg-transparent border-none",
          className,
        )}
        {...props}
      />
    </div>
  )
})
PrefixedInput.displayName = "Input"
