import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    // Base styles: Focus on smooth transitions and consistent dark mode focus ring
    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-gray-950 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                // Primary (Blue Accent - Enhanced for Chat Send button)
                primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-lg shadow-blue-600/30",

                // Default (Dark Mode: Primary Dark)
                default: "bg-gray-800 text-white hover:bg-gray-700",
                
                // Destructive (Red)
                destructive:
                    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
                
                // Outline (Bordered button for secondary actions)
                outline:
                    "border border-gray-700 bg-transparent text-gray-50 hover:bg-gray-800 hover:text-white",
                
                // Secondary (Muted background)
                secondary:
                    "bg-gray-700 text-gray-50 hover:bg-gray-600",
                
                // Ghost (Transparent, used for back/navigation)
                ghost: "hover:bg-gray-800 hover:text-blue-400",
                
                // Link
                link: "text-blue-400 underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-full px-3",
                lg: "h-11 rounded-full px-8",
                // Icon size uses a different h/w for better touch target and visual balance
                icon: "h-10 w-10 p-0 flex items-center justify-center", 
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props} />
    );
})
Button.displayName = "Button"

export { Button, buttonVariants }
