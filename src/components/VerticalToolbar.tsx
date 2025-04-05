
import React, { useState } from "react";
import { 
  ListOrdered, 
  GanttChart, 
  Settings, 
  LineChart, 
  Thermometer, 
  Droplets, 
  Battery 
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

export interface WidgetToggleState {
  metrics: boolean;
  tasks: boolean;
  activity: boolean;
  graph: boolean;
}

interface VerticalToolbarProps {
  widgetToggles: WidgetToggleState;
  setWidgetToggles: React.Dispatch<React.SetStateAction<WidgetToggleState>>;
}

const VerticalToolbar: React.FC<VerticalToolbarProps> = ({ 
  widgetToggles, 
  setWidgetToggles 
}) => {
  const toggleWidget = (key: keyof WidgetToggleState) => {
    setWidgetToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const buttons = [
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

  return (
    <TooltipProvider delayDuration={300}>
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
        <div className="glassmorphism flex flex-col items-center p-2 rounded-lg gap-2">
          {buttons.map((button, index) => (
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
              {index < buttons.length - 1 && <Separator className="w-6 bg-white/20" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default VerticalToolbar;
