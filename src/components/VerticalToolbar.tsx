
import React, { useState } from "react";
import { 
  ListOrdered, 
  GanttChart, 
  Settings, 
  LineChart,
  Camera
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

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
}

const VerticalToolbar: React.FC<VerticalToolbarProps> = ({ 
  widgetToggles, 
  setWidgetToggles,
  onToggleCameraView,
  isOverheadCamera
}) => {
  
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

  const handleToggleCameraView = () => {
    onToggleCameraView();
    toast.success(isOverheadCamera ? "Switched to headmounted camera" : "Switched to overhead camera", {
      description: isOverheadCamera ? "Viewing from camera perspective" : "Viewing from top down perspective",
      icon: <Camera size={18} />
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

          {/* Camera Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center gap-1 px-2 py-3">
                <Camera size={18} className="mb-1" />
                <Switch 
                  checked={!isOverheadCamera} 
                  onCheckedChange={handleToggleCameraView} 
                  className="data-[state=checked]:bg-blue-500"
                />
                <span className="text-[10px] text-center mt-1 font-medium">
                  {isOverheadCamera ? "Overhead" : "Head Mount"}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Toggle between overhead and head-mounted camera</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default VerticalToolbar;
