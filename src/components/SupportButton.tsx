
import React from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface SupportButtonProps {
  onClick: () => void;
}

const SupportButton: React.FC<SupportButtonProps> = ({ onClick }) => {
  const { theme } = useTheme();
  
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button 
        onClick={onClick} 
        className={`rounded-full shadow-lg w-10 h-10 p-0 ${
          theme === "light" 
            ? "bg-white text-gray-800 hover:bg-gray-100" 
            : "bg-primary hover:bg-primary/90 text-primary-foreground"
        }`}
        size="sm"
        aria-label="Support"
      >
        <HelpCircle size={20} />
      </Button>
    </div>
  );
};

export default SupportButton;
