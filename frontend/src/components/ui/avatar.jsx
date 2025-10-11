import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    // Base Avatar styling: Consistent size, rounded corners, and subtle shadow for depth
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-[50%] shadow-md sm:h-12 sm:w-12 transition-all duration-300",
      className
    )}
    {...props} />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    // Ensures the image covers the full circular space smoothly
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props} />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      // Dark Theme Fallback: Used bg-gray-600 for better contrast/visibility than 700/800, 
      // with a slight text bump for character initials.
      "flex h-full w-full items-center justify-center rounded-[50%] bg-gray-700 text-lg font-bold text-gray-200 transition-colors duration-300",
      className
    )}
    {...props} />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
