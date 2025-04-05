
import React from "react";
import HarvestCountdown from "./HarvestCountdown";
import NavigationMenuComponent from "./NavigationMenu";

interface HeaderProps {
  unitId: string;
  cropName: string;
  startDate: string;
}

const Header: React.FC<HeaderProps> = ({ unitId, cropName, startDate }) => {
  return (
    <div className="glassmorphism fixed top-0 left-0 right-0 flex items-center justify-between h-16 px-3 md:px-6 z-50">
      <div className="flex items-center space-x-4 overflow-x-auto hide-scrollbar">
        <div className="font-bold text-xl text-foreground whitespace-nowrap">Alpha Block</div>
        <div className="flex items-center bg-primary/10 px-3 py-1 rounded-md text-sm text-foreground/90 whitespace-nowrap">
          <span className="mr-1.5">🇻🇳</span>
          <span>{unitId}</span>
        </div>
        <div className="flex items-center bg-primary/10 px-3 py-1 rounded-md text-sm text-foreground/90 whitespace-nowrap">
          <span className="mr-1.5">🍄</span>
          <span>{cropName} • Started {startDate}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <HarvestCountdown harvestDate="2025-04-15T00:00:00" />
        <NavigationMenuComponent />
      </div>
    </div>
  );
};

export default Header;
