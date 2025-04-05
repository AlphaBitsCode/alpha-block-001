
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sliders, Sun, Moon, Droplets, ThermometerIcon, Fan, Bell, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface ControlPanelProps {
  temperature: number;
  humidity: number;
  isHumidifierOn: boolean;
  isLightOn: boolean;
  toggleHumidifier: () => void;
  toggleLight: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  temperature,
  humidity,
  isHumidifierOn,
  isLightOn,
  toggleHumidifier,
  toggleLight
}) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  
  const panelContent = (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Control Panel</h3>
        <Button variant="ghost" size="icon" onClick={handleClose}>
          <X size={18} />
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Theme Toggle */}
        <div className="bg-background/20 backdrop-blur-sm p-4 rounded-xl flex flex-col items-center space-y-2">
          <div className="flex items-center justify-between w-full">
            <span className="flex items-center">
              <Sun size={16} className="mr-2" />
              <Moon size={16} />
            </span>
            <span className="text-sm font-medium">Theme</span>
          </div>
          <ThemeToggle />
        </div>
        
        {/* Humidifier Control */}
        <div className="bg-background/20 backdrop-blur-sm p-4 rounded-xl flex flex-col items-center space-y-2">
          <div className="flex items-center justify-between w-full">
            <span className="flex items-center">
              <Droplets size={16} className="text-blue-400 mr-2" />
              <span className="text-sm font-medium">Humidifier</span>
            </span>
            <span className={`text-xs ${isHumidifierOn ? 'text-green-400' : 'text-gray-400'}`}>
              {isHumidifierOn ? 'ON' : 'OFF'}
            </span>
          </div>
          <Button 
            variant={isHumidifierOn ? "default" : "outline"} 
            className="w-full"
            onClick={toggleHumidifier}
          >
            <Fan size={16} className="mr-2" />
            {isHumidifierOn ? 'Turn Off' : 'Turn On'}
          </Button>
        </div>
        
        {/* Lighting Control */}
        <div className="bg-background/20 backdrop-blur-sm p-4 rounded-xl flex flex-col items-center space-y-2">
          <div className="flex items-center justify-between w-full">
            <span className="flex items-center">
              <Sun size={16} className="text-yellow-400 mr-2" />
              <span className="text-sm font-medium">Grow Light</span>
            </span>
            <span className={`text-xs ${isLightOn ? 'text-green-400' : 'text-gray-400'}`}>
              {isLightOn ? 'ON' : 'OFF'}
            </span>
          </div>
          <Button 
            variant={isLightOn ? "default" : "outline"} 
            className="w-full"
            onClick={toggleLight}
          >
            <Sun size={16} className="mr-2" />
            {isLightOn ? 'Turn Off' : 'Turn On'}
          </Button>
        </div>
        
        {/* Notifications */}
        <div className="bg-background/20 backdrop-blur-sm p-4 rounded-xl flex flex-col items-center space-y-2">
          <div className="flex items-center justify-between w-full">
            <span className="flex items-center">
              <Bell size={16} className="mr-2" />
              <span className="text-sm font-medium">Notifications</span>
            </span>
            <span className="text-xs text-green-400">ON</span>
          </div>
          <Button variant="default" className="w-full">
            <Bell size={16} className="mr-2" />
            Configure
          </Button>
        </div>
      </div>
    </div>
  );
  
  // Use Sheet for desktop and Drawer for mobile
  return (
    <>
      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button 
              size="icon" 
              variant="outline" 
              className="fixed top-4 right-20 z-50 h-8 w-8 rounded-full glassmorphism border border-white/20"
            >
              <Sliders size={14} />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="bg-black/70 backdrop-blur-lg border-t border-white/10">
            {panelContent}
          </DrawerContent>
        </Drawer>
      ) : (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button 
              size="icon" 
              variant="outline" 
              className="fixed top-4 right-20 z-50 h-8 w-8 rounded-full glassmorphism border border-white/20"
            >
              <Sliders size={14} />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-black/70 backdrop-blur-lg border-l border-white/10">
            {panelContent}
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default ControlPanel;
