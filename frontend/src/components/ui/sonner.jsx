import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      // Keep theme={theme} so sonner can automatically apply system/user preference
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          // --- TOAST CONTAINER STYLING ---
          toast:
            "group toast " +
            // *** REVISED LIGHT MODE STYLING: MAKE IT DARK BY DEFAULT ***
            // By applying the dark colors here, the toast will always be dark.
            "group-[.toaster]:bg-gray-900 group-[.toaster]:text-white group-[.toaster]:border-gray-700 group-[.toaster]:shadow-lg " +
            // Dark Mode Overrides (These are fine and ensure consistency)
            "dark:group-[.toaster]:bg-gray-900 dark:group-[.toaster]:text-white dark:group-[.toaster]:border-gray-700",
          
          // --- DESCRIPTION TEXT STYLING ---
          description: 
            "group-[.toast]:text-gray-400 dark:group-[.toast]:text-gray-400", // Muted gray text
          
          // --- ACTION BUTTON STYLING (Primary CTA) ---
          actionButton:
            // Use a consistent, high-contrast style for action button
            "group-[.toast]:bg-blue-600 group-[.toast]:text-white dark:group-[.toast]:bg-blue-600 dark:group-[.toast]:text-white",
          
          // --- CANCEL BUTTON STYLING (Secondary CTA) ---
          cancelButton:
            // Use a muted background for cancel button
            "group-[.toast]:bg-gray-800 group-[.toast]:text-gray-400 dark:group-[.toast]:bg-gray-800 dark:group-[.toast]:text-gray-400",
        },
      }}
      {...props} />
  );
}

export { Toaster }