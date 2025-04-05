
import React, { useState } from "react";
import { 
  ListOrdered, 
  GanttChart, 
  Settings, 
  LineChart,
  Move,
  Moon,
  Sun
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/use-theme";

export interface WidgetToggleState {
  metrics: boolean;
  tasks: boolean;
  activity: boolean;
  graph: boolean;
  minimap: boolean;
}

interface VerticalToolbarProps {
  widgetToggles: WidgetToggleState;
  setWidgetToggles: React.Dispatch<React.SetStateAction<WidgetToggleState>>;
  onToggleCameraView: () => void;
  isOverheadCamera: boolean;
  onOpenRobotControls: () => void;
}

const VerticalToolbar: React.FC<VerticalToolbarProps> = ({ 
  widgetToggles, 
  setWidgetToggles,
  onToggleCameraView,
  isOverheadCamera,
  onOpenRobotControls
}) => {
  const { theme, setTheme } = useTheme();
  
  const toggleWidget = (key: keyof WidgetToggleState) => {
    // Skip toggling minimap as it's now permanently displayed
    if (key === 'minimap') return;
    
    setWidgetToggles(prev => ({ ...prev, [key]: !prev[key] }));
    
    // Show feedback toast when toggling widgets
    const isActive = !widgetToggles[key];
    const widgetNames: Record<keyof WidgetToggleState, string> = {
      metrics: "System Metrics",
      tasks: "Care Plan",
      activity: "Activity Log",
      graph: "Monitoring History",
      minimap: "Camera Position"
    };
    
    toast.success(`${widgetNames[key]} ${isActive ? 'shown' : 'hidden'}`, {
      description: isActive ? `${widgetNames[key]} is now visible` : `${widgetNames[key]} is now hidden`,
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

  // Widget buttons - removed minimap toggle
  const widgets = [
    { 
      id: 'metrics', 
      icon: Settings, 
      tooltip: "System Metrics",
      active: widgetToggles.metrics
    },
    { 
      id: 'tasks', 
      icon: GanttChart, 
      tooltip: "Care Plan",
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
      tooltip: "Monitoring History",
      active: widgetToggles.graph
    }
  ];

  return (
    <TooltipProvider delayDuration={300}>
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
        <div className="glassmorphism bg-black/80 dark:bg-black/80 light:bg-white/90 flex flex-col items-center p-2 rounded-lg gap-2 shadow-lg border border-white/20 dark:border-white/20 light:border-black/20">
          {/* Widget toggles */}
          {widgets.map((button, index) => (
            <React.Fragment key={button.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => toggleWidget(button.id as keyof WidgetToggleState)}
                    className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${
                      button.active ? 'bg-primary/50 text-foreground dark:text-white light:text-black' : 'text-foreground/70 hover:text-foreground hover:bg-primary/20'
                    }`}
                  >
                    <button.icon size={18} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{button.tooltip}</p>
                </TooltipContent>
              </Tooltip>
              {index === widgets.length - 1 && <Separator className="w-6 bg-white/30 dark:bg-white/30 light:bg-black/30" />}
            </React.Fragment>
          ))}

          {/* Camera Position Control Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onOpenRobotControls}
                className="w-10 h-10 rounded-md flex items-center justify-center transition-colors text-foreground/70 hover:text-foreground hover:bg-primary/20"
              >
                <Move size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Camera Position Controls</p>
            </TooltipContent>
          </Tooltip>

          {/* Theme Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleThemeMode}
                className="w-10 h-10 rounded-md flex items-center justify-center transition-colors text-foreground/70 hover:text-foreground hover:bg-primary/20"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default VerticalToolbar;
