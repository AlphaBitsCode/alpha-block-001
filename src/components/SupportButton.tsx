
import React from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

interface SupportButtonProps {
  onClick: () => void;
}

const SupportButton: React.FC<SupportButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button 
        onClick={onClick} 
        className="rounded-full shadow-lg w-10 h-10 p-0 bg-primary hover:bg-primary/90 text-primary-foreground dark:bg-primary dark:text-primary-foreground light:bg-primary light:text-primary-foreground"
        size="sm"
        aria-label="Support"
      >
        <HelpCircle size={20} />
      </Button>
    </div>
  );
};

export default SupportButton;
