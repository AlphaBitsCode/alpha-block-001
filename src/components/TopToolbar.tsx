
import React from "react";
import { 
  Droplets, 
  Sun,
  Camera
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

interface TopToolbarProps {
  isHumidifierOn: boolean;
  toggleHumidifier: () => void;
  isLightOn: boolean;
  toggleLight: () => void;
  isOverheadCamera: boolean;
  toggleCameraView: () => void;
  isMobile?: boolean;
}

const TopToolbar: React.FC<TopToolbarProps> = ({ 
  isHumidifierOn,
  toggleHumidifier,
  isLightOn,
  toggleLight,
  isOverheadCamera,
  toggleCameraView,
  isMobile = false
}) => {
  const handleToggleHumidifier = () => {
    toggleHumidifier();
    toast.success(isHumidifierOn ? "Humidifier off" : "Humidifier on");
  };

  const handleToggleLight = () => {
    toggleLight();
    toast.success(isLightOn ? "Grow light off" : "Grow light on");
  };

  const handleToggleCameraView = () => {
    toggleCameraView();
    toast.success(isOverheadCamera ? "Head cam active" : "Overhead cam active");
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="glassmorphism flex items-center px-3 py-2 rounded-lg gap-3 md:gap-4 dark:bg-black/80 light:bg-white/90 shadow-md z-[90]">
        {/* Humidifier Switch */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5">
              <Droplets 
                size={16} 
                className={isHumidifierOn ? "text-blue-400" : "text-foreground/60"} 
              />
              <Switch 
                checked={isHumidifierOn} 
                onCheckedChange={handleToggleHumidifier} 
                className="data-[state=checked]:bg-blue-500"
              />
              <span className="text-xs font-medium">{isMobile ? "Humid" : "Humidifier"}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="z-[100]">
            <p>{isHumidifierOn ? "Turn Off Humidifier" : "Turn On Humidifier"}</p>
          </TooltipContent>
        </Tooltip>

        {/* Grow Light Switch */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5">
              <Sun 
                size={16} 
                className={isLightOn ? "text-yellow-400" : "text-foreground/60"} 
              />
              <Switch 
                checked={isLightOn} 
                onCheckedChange={handleToggleLight} 
                className="data-[state=checked]:bg-yellow-500"
              />
              <span className="text-xs font-medium">{isMobile ? "Light" : "Grow Light"}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="z-[100]">
            <p>{isLightOn ? "Turn Off Grow Light" : "Turn On Grow Light"}</p>
          </TooltipContent>
        </Tooltip>

        {/* Camera Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5">
              <Camera
                size={16}
                className={!isOverheadCamera ? "text-blue-400" : "text-foreground/60"}
              />
              <Switch 
                checked={!isOverheadCamera} 
                onCheckedChange={handleToggleCameraView} 
                className="data-[state=checked]:bg-blue-500"
              />
              <span className="text-xs font-medium">
                {isMobile ? "Cam" : isOverheadCamera ? "Overhead" : "Head Cam"}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="z-[100]">
            <p>Toggle camera view</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default TopToolbar;
