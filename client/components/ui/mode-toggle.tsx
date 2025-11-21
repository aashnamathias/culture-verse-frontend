import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button" // Assuming this path is correct
import { useTheme } from "@/components/ui/theme-provider" // Ensure this path is correct

export function ModeToggle() {
  // Destructure the theme and the setter function
  const { theme, setTheme } = useTheme() 

  const handleToggle = () => {
    // Determine the next theme based on the current one
    let newTheme: "dark" | "light" = theme === "light" ? "dark" : "light"
    
    // If the theme is currently 'system', we still toggle to 'dark' or 'light'
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
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-primary" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}