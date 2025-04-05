
import React from "react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex gap-2"
    >
      {theme === "dark" ? (
        <>
          <Sun size={16} />
          <span className="sr-only md:not-sr-only">Light Mode</span>
        </>
      ) : (
        <>
          <Moon size={16} />
          <span className="sr-only md:not-sr-only">Dark Mode</span>
        </>
      )}
    </Button>
  );
};

export default ThemeToggle;
