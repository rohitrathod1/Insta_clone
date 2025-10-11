import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
    // Base styles: Ensure dark mode border and focus ring match the deep dark theme
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-gray-800 dark:focus:ring-gray-300",
    {
        variants: {
            variant: {
                // Default: Dark background, light text (Replaced slate with deep gray for dark mode)
                default:
                    "border-transparent bg-gray-200 text-gray-950 hover:bg-gray-200/80 dark:bg-gray-50 dark:text-gray-950 dark:hover:bg-gray-50/80",
                
                // Primary/Blue: Added a new primary color for the main accent (e.g., Follow button blue)
                primary: 
                    "border-transparent bg-blue-600 text-white hover:bg-blue-600/90 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700",
                
                // Secondary: Used for muted tags. Swapped colors for dark mode clarity.
                secondary:
                    "border-transparent bg-gray-200 text-gray-950 hover:bg-gray-200/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80",
                
                // Destructive: Red for errors/alerts
                destructive:
                    "border-transparent bg-red-600 text-white hover:bg-red-600/90 dark:bg-red-800 dark:text-white dark:hover:bg-red-800/80",
                
                // Outline: Border only
                outline: 
                    "text-gray-950 dark:text-gray-50 border-gray-300 dark:border-gray-700",
            },
        },
        defaultVariants: {
            variant: "secondary", // Set secondary as the new dark mode friendly default
        },
    }
)

function Badge({
    className,
    variant,
    ...props
}) {
    return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}

export { Badge, badgeVariants }