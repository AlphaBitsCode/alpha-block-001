
import React, { useState } from "react";
import { 
  ListOrdered, 
  GanttChart, 
  Settings, 
  LineChart, 
  Thermometer, 
  Droplets, 
  Battery,
  Sun,
  Moon,
  Move
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/hooks/use-theme";
import { toast } from "sonner";

export interface WidgetToggleState {
  metrics: boolean;
  tasks: boolean;
  activity: boolean;
  graph: boolean;
}

interface VerticalToolbarProps {
  widgetToggles: WidgetToggleState;
  setWidgetToggles: React.Dispatch<React.SetStateAction<WidgetToggleState>>;
  isHumidifierOn: boolean;
  toggleHumidifier: () => void;
  isLightOn: boolean;
  toggleLight: () => void;
  onOpenRobotControls: () => void;
}

const VerticalToolbar: React.FC<VerticalToolbarProps> = ({ 
  widgetToggles, 
  setWidgetToggles,
  isHumidifierOn,
  toggleHumidifier,
  isLightOn,
  toggleLight,
  onOpenRobotControls
}) => {
  const { theme, setTheme } = useTheme();
  
  const toggleWidget = (key: keyof WidgetToggleState) => {
    setWidgetToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

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

  const widgets = [
    { 
      id: 'metrics', 
      icon: Settings, 
      tooltip: "Metrics Dashboard",
      active: widgetToggles.metrics
    },
    { 
      id: 'tasks', 
      icon: GanttChart, 
      tooltip: "Care Tasks",
      active: widgetToggles.tasks
    },
    { 
      id: 'activity', 
      icon: ListOrdered, 
      tooltip: "Activity Log",
      active: widgetToggles.activity
    },
    { 
      id: 'graph', 
      icon: LineChart, 
      tooltip: "Performance Graph",
      active: widgetToggles.graph
    }
  ];

  const controls = [
    {
      id: 'humidifier',
      icon: Droplets,
      tooltip: isHumidifierOn ? "Turn Off Humidifier" : "Turn On Humidifier",
      active: isHumidifierOn,
      onClick: handleToggleHumidifier,
      color: isHumidifierOn ? "text-blue-400" : "text-foreground/60"
    },
    {
      id: 'light',
      icon: Sun,
      tooltip: isLightOn ? "Turn Off Grow Light" : "Turn On Grow Light",
      active: isLightOn,
      onClick: handleToggleLight,
      color: isLightOn ? "text-yellow-400" : "text-foreground/60"
    },
    {
      id: 'theme',
      icon: theme === 'dark' ? Moon : Sun,
      tooltip: theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode",
      active: false,
      onClick: toggleThemeMode
    },
    {
      id: 'camera',
      icon: Move,
      tooltip: "Robot Camera Controls",
      active: false,
      onClick: onOpenRobotControls
    }
  ];

  return (
    <TooltipProvider delayDuration={300}>
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
        <div className="glassmorphism flex flex-col items-center p-2 rounded-lg gap-2">
          {/* Widget toggles */}
          {widgets.map((button, index) => (
            <React.Fragment key={button.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => toggleWidget(button.id as keyof WidgetToggleState)}
                    className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${
                      button.active ? 'bg-primary/30 text-foreground' : 'text-foreground/60 hover:text-foreground hover:bg-primary/10'
                    }`}
                  >
                    <button.icon size={18} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{button.tooltip}</p>
                </TooltipContent>
              </Tooltip>
              {index === widgets.length - 1 && <Separator className="w-6 bg-white/20" />}
            </React.Fragment>
          ))}

          {/* Controls */}
          {controls.map((control, index) => (
            <React.Fragment key={control.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={control.onClick}
                    className={`w-10 h-10 rounded-md flex items-center justify-center transition-all ${
                      control.active 
                        ? 'bg-primary/30 text-foreground animate-pulse' 
                        : 'text-foreground/60 hover:text-foreground hover:bg-primary/10'
                    } ${control.color || ''}`}
                  >
                    <control.icon size={18} className={control.color} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{control.tooltip}</p>
                </TooltipContent>
              </Tooltip>
              {index < controls.length - 1 && <Separator className="w-6 bg-white/20" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default VerticalToolbar;
