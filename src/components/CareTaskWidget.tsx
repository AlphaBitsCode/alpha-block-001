
import React, { useState } from "react";
import TelemetryWidget from "./TelemetryWidget";
import { Calendar, Droplets, Clock, Sun, Check, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

interface CareTaskProps {
  className?: string;
}

interface CareTask {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  interval?: string;
  targetValues?: string;
  dueDate?: string;
  isCompleted?: boolean;
}

const CareTaskWidget: React.FC<CareTaskProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [initialDragPos, setInitialDragPos] = useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(true);

  // Tasks for Pink Oyster mushroom care
  const careTasks: CareTask[] = [
    {
      id: "humidity",
      title: "Maintain Humidity",
      description: "Keep humidity levels within optimal range",
      targetValues: "80-85%",
      icon: <Droplets size={16} className="text-blue-400" />,
      interval: "Continuous",
      isCompleted: true,
    },
    {
      id: "humidifier",
      title: "Humidifier Check",
      description: "Activate humidifier when levels drop below threshold",
      targetValues: "< 75%",
      icon: <Clock size={16} className="text-yellow-400" />,
      interval: "Every 5 minutes",
      isCompleted: true,
    },
    {
      id: "lights",
      title: "Grow Light Schedule",
      description: "Automated lighting for optimal growth",
      icon: <Sun size={16} className="text-yellow-400" />,
      interval: "1:00 AM - 3:00 AM daily",
      isCompleted: true,
    },
    {
      id: "harvest",
      title: "Scheduled Harvest",
      description: "Optimal time to harvest Pink Oyster mushrooms",
      icon: <Calendar size={16} className="text-green-400" />,
      dueDate: "April 14, 2025",
      isCompleted: false,
    }
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setInitialDragPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      setPosition({
        x: e.clientX - initialDragPos.x,
        y: e.clientY - initialDragPos.y
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleDoubleClick = () => {
    setExpanded(true);
  };

  React.useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove as any);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove as any);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove as any);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  if (!expanded) {
    return (
      <div 
        className="fixed z-50 glassmorphism w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
        style={{ left: position.x, top: position.y }}
        onDoubleClick={handleDoubleClick}
      >
        <Calendar size={24} className="text-pink-400" />
      </div>
    );
  }

  return (
    <div
      className={cn("fixed z-40", className)}
      style={{ 
        left: position.x,
        top: position.y,
        width: collapsed ? 'auto' : 'auto',
        maxWidth: '400px',
      }}
    >
      <Collapsible open={!collapsed} onOpenChange={(open) => setCollapsed(!open)}>
        <TelemetryWidget
          title="Pink Oyster Care Plan"
          icon={<Calendar size={18} className="text-pink-400" />}
          onMouseDown={handleMouseDown}
          className="min-w-[320px]"
          onMinimizeClick={() => setExpanded(false)}
        >
          <ResizablePanelGroup direction="vertical" className="min-h-[100px]">
            <ResizablePanel defaultSize={100} minSize={10}>
              <CollapsibleContent>
                <div className="space-y-4">
                  {careTasks.map((task) => (
                    <div 
                      key={task.id}
                      className={cn(
                        "p-3 rounded-md border border-white/10",
                        task.isCompleted ? "bg-white/5 dark:bg-black/20" : "bg-white/10 dark:bg-black/30"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {task.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                            {task.title}
                            {task.isCompleted && (
                              <Check size={14} className="text-green-400" />
                            )}
                          </h4>
                          <p className="text-xs text-foreground/70">{task.description}</p>
                          
                          {task.targetValues && (
                            <div className="mt-2 flex items-center gap-1">
                              <span className="text-xs font-medium text-foreground/80">Target:</span>
                              <span className="text-xs text-foreground">{task.targetValues}</span>
                            </div>
                          )}
                          
                          {task.interval && (
                            <div className="mt-1 flex items-center gap-1">
                              <span className="text-xs font-medium text-foreground/80">Interval:</span>
                              <span className="text-xs text-foreground">{task.interval}</span>
                            </div>
                          )}
                          
                          {task.dueDate && (
                            <div className="mt-1 flex items-center gap-1">
                              <span className="text-xs font-medium text-foreground/80">Date:</span>
                              <span className="text-xs text-foreground">{task.dueDate}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-xs text-foreground/50 text-right pt-2">
                    Cycle Started: April 1, 2025
                  </div>
                </div>
              </CollapsibleContent>
            </ResizablePanel>
          </ResizablePanelGroup>
        </TelemetryWidget>
      </Collapsible>
    </div>
  );
};

export default CareTaskWidget;
