import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        // Base Styling: Designed for a Dark Theme Chat Interface
        "flex h-12 w-full rounded-full border border-gray-700 bg-gray-800 px-4 py-2 text-sm",
        "placeholder:text-gray-500 text-white transition-all duration-300",
        
        // Focus & Interaction
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600",
        
        // Disabled States (kept consistent)
        "disabled:cursor-not-allowed disabled:opacity-50",
        
        // File Input reset (kept consistent)
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        
        // Override with custom classes
        className
      )}
      ref={ref}
      {...props} />
  );
})
Input.displayName = "Input"

export { Input }
