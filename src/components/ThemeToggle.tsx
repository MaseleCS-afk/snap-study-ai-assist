import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl hover:bg-muted transition-colors"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <Sun className="w-4 h-4 text-foreground transition-all duration-250 dark:scale-0 dark:rotate-90 dark:opacity-0 scale-100 rotate-0 opacity-100 absolute inset-0 m-auto" />
      <Moon className="w-4 h-4 text-foreground transition-all duration-250 scale-0 -rotate-90 opacity-0 dark:scale-100 dark:rotate-0 dark:opacity-100" />
    </button>
  );
}
