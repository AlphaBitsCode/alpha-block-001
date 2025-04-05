
import React from "react";
import { 
  Droplets, 
  Sun,
  Moon,
  Move
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/hooks/use-theme";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

interface TopToolbarProps {
  isHumidifierOn: boolean;
  toggleHumidifier: () => void;
  isLightOn: boolean;
  toggleLight: () => void;
  onOpenRobotControls: () => void;
  isRobotControlsOpen?: boolean;
}

const TopToolbar: React.FC<TopToolbarProps> = ({ 
  isHumidifierOn,
  toggleHumidifier,
  isLightOn,
  toggleLight,
  onOpenRobotControls,
  isRobotControlsOpen = false
}) => {
  const { theme, setTheme } = useTheme();
  
  const handleToggleHumidifier = () => {
    toggleHumidifier();
    toast.success(isHumidifierOn ? "Humidifier turned off" : "Humidifier turned on", {
      description: isHumidifierOn ? "Humidity will gradually decrease" : "Humidity will be maintained at optimal levels",
      icon: <Droplets size={18} />
    });
  };

  const handleToggleLight = () => {
    toggleLight();
    toast.success(isLightOn ? "Grow light turned off" : "Grow light turned on", {
      description: isLightOn ? "Light cycle paused" : "Light cycle activated",
      icon: <Sun size={18} />
    });
  };

  const toggleThemeMode = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    toast.success(`${newTheme === 'dark' ? 'Dark' : 'Light'} mode activated`, {
      description: `Interface switched to ${newTheme} mode`,
      icon: newTheme === 'dark' ? <Moon size={18} /> : <Sun size={18} />
    });
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="fixed top-[76px] left-1/2 transform -translate-x-1/2 z-50">
        <div className="glassmorphism flex items-center px-4 py-3 rounded-full gap-4 dark:bg-black/80 light:bg-white/90 shadow-lg">
          {/* Humidifier Switch */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <Droplets 
                  size={18} 
                  className={isHumidifierOn ? "text-blue-400" : "text-foreground/60"} 
                />
                <Switch 
                  checked={isHumidifierOn} 
                  onCheckedChange={handleToggleHumidifier} 
                  className="data-[state=checked]:bg-blue-500"
                />
                <span className="text-xs font-medium">Humidifier</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isHumidifierOn ? "Turn Off Humidifier" : "Turn On Humidifier"}</p>
            </TooltipContent>
          </Tooltip>

          {/* Grow Light Switch */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <Sun 
                  size={18} 
                  className={isLightOn ? "text-yellow-400" : "text-foreground/60"} 
                />
                <Switch 
                  checked={isLightOn} 
                  onCheckedChange={handleToggleLight} 
                  className="data-[state=checked]:bg-yellow-500"
                />
                <span className="text-xs font-medium">Grow Light</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isLightOn ? "Turn Off Grow Light" : "Turn On Grow Light"}</p>
            </TooltipContent>
          </Tooltip>

          {/* Robot Controls Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer" onClick={onOpenRobotControls}>
                <Move size={18} className={isRobotControlsOpen ? "text-primary" : "text-foreground/60"} />
                <span className="text-xs font-medium">Camera Position</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Robot Camera Controls</p>
            </TooltipContent>
          </Tooltip>

          {/* Theme Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer" onClick={toggleThemeMode}>
                {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                <span className="text-xs font-medium">
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default TopToolbar;
