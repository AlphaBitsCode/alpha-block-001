
import React from "react";
import { LucideIcon } from "lucide-react";

interface WidgetIconProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  position: { x: number, y: number };
}

const WidgetIcon: React.FC<WidgetIconProps> = ({ 
  icon: Icon, 
  label, 
  onClick, 
  position 
}) => {
  return (
    <div 
      className="absolute z-40 cursor-pointer"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px` 
      }}
      onClick={onClick}
      title={label}
    >
      <div className="glassmorphism w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors">
        <Icon size={18} className="text-foreground/80" />
      </div>
    </div>
  );
};

export default WidgetIcon;
