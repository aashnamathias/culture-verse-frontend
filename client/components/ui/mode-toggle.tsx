import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button" 
import { useTheme } from "@/components/ui/theme-provider" // Ensure this path is correct

export function ModeToggle() {
  const { theme, setTheme } = useTheme() // Correctly destructuring setTheme

  // FIX: Logic to correctly determine and set the next theme
  const handleToggle = () => {
    let newTheme: "dark" | "light" = theme === "light" ? "dark" : "light"
    
    // Handle switching out of 'system' mode
    if (theme === "system") {
      newTheme = 
        window.document.documentElement.classList.contains("dark")
        ? "light" 
        : "dark"
    }
    setTheme(newTheme)
  }
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleToggle} 
      className="rounded-full"
    >
      {/* FIX: Changed hardcoded color to dynamic text-primary */}
      <Sun 
        className="
          h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all 
          dark:-rotate-90 dark:scale-0 
          text-primary" 
        aria-hidden="true"
      />
      <Moon 
        className="
          absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all 
          dark:rotate-0 dark:scale-100 
          text-primary"
        aria-hidden="true"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}