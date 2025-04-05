
import React from "react";
import { Calendar, Droplets, Clock, Sun, Check } from "lucide-react";

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

const CareTaskWidget: React.FC = () => {
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

  return (
    <div className="space-y-4">
      {careTasks.map((task) => (
        <div 
          key={task.id}
          className={`p-3 rounded-md border border-white/10 ${
            task.isCompleted ? "bg-white/5 dark:bg-black/20" : "bg-white/10 dark:bg-black/30"
          }`}
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
  );
};

export default CareTaskWidget;
