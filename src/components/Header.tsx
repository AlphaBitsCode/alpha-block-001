
import React from "react";
import { MapPin } from "lucide-react";
import RobotControlsWidget from "./RobotControlsWidget";

interface HeaderProps {
  unitId: string;
}

const Header: React.FC<HeaderProps> = ({ unitId }) => {
  const country = "Vietnam";

  return (
    <div className="glassmorphism fixed top-0 left-0 right-0 flex items-center justify-between h-16 px-3 md:px-6 z-50">
      <div className="flex items-center space-x-2 overflow-x-auto hide-scrollbar">
        <div className="font-bold text-xl text-foreground whitespace-nowrap">Alpha Block</div>
        <div className="bg-primary/10 px-3 py-1 rounded-md text-sm text-foreground/90 whitespace-nowrap">
          Unit #{unitId}
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4 text-foreground/90">
        <RobotControlsWidget initialPosition={{ x: 50, y: 50 }} />
        
        <div className="hidden md:flex items-center">
          <MapPin size={16} className="mr-1.5" />
          <span>{country}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
