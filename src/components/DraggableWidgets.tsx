
import React from "react";
import { useDraggable } from "@/hooks/use-draggable";
import { Settings, GanttChart, ListOrdered, LineChart } from "lucide-react";
import TelemetryWidget from "./TelemetryWidget";
import ConsolidatedMetricsWidget from "./ConsolidatedMetricsWidget";
import CareTaskWidget from "./CareTaskWidget";
import ActivityLogWidget from "./ActivityLogWidget";
import MiniGraph from "./MiniGraph";

interface WidgetToggleState {
  metrics: boolean;
  tasks: boolean;
  activity: boolean;
  graph: boolean;
  minimap: boolean;
}

interface DraggableWidgetsProps {
  isMobile: boolean;
  widgetToggles: WidgetToggleState;
  metricsData: {
    temperature: number;
    humidity: number;
    batteryPercentage: number;
    isCharging: boolean;
    lightingLevel: number;
    mushroomHealth: "healthy" | "warning" | "alert";
    lastUpdated: string;
  };
  mockActivityLogs: any[];
  mockGraphData: any[];
}

const DraggableWidgets: React.FC<DraggableWidgetsProps> = ({
  isMobile,
  widgetToggles,
  metricsData,
  mockActivityLogs,
  mockGraphData,
}) => {
  // Draggable hooks for each widget
  const metricsWidget = useDraggable({ 
    initialPosition: { x: window.innerWidth - 330, y: 80 },
    bounds: { top: 70, right: window.innerWidth - 10 }
  });
  
  const tasksWidget = useDraggable({ 
    initialPosition: { x: 20, y: 320 },
    bounds: { top: 70, left: 10 }
  });
  
  const activityWidget = useDraggable({ 
    initialPosition: { x: window.innerWidth - 330, y: 80 },
    bounds: { top: 70, right: window.innerWidth - 10 }
  });
  
  // Updated position for graph widget - middle right
  const graphWidget = useDraggable({ 
    initialPosition: { x: window.innerWidth - 520, y: window.innerHeight / 2 - 175 },
    bounds: { top: 70, right: window.innerWidth - 10 }
  });

  if (isMobile) {
    return (
      <div className="fixed top-20 right-4 bottom-4 z-40 w-full max-w-xs flex flex-col space-y-4 overflow-y-auto pb-20">
        {widgetToggles.metrics && (
          <div className="glassmorphism p-4 rounded-lg dark:bg-black/80 light:bg-white/90">
            <ConsolidatedMetricsWidget {...metricsData} />
          </div>
        )}
        {widgetToggles.tasks && (
          <div className="glassmorphism p-4 rounded-lg dark:bg-black/80 light:bg-white/90">
            <CareTaskWidget />
          </div>
        )}
        {widgetToggles.activity && (
          <div className="glassmorphism p-4 rounded-lg dark:bg-black/80 light:bg-white/90">
            <ActivityLogWidget logs={mockActivityLogs} />
          </div>
        )}
        {widgetToggles.graph && (
          <div className="glassmorphism p-4 rounded-lg h-[350px] dark:bg-black/80 light:bg-white/90">
            <MiniGraph data={mockGraphData} />
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Metrics Widget */}
      {widgetToggles.metrics && (
        <TelemetryWidget 
          title="System Metrics" 
          icon={<Settings size={18} />}
          position={metricsWidget.position}
          onMouseDown={metricsWidget.onMouseDown}
          ref={metricsWidget.dragRef}
        >
          <ConsolidatedMetricsWidget {...metricsData} />
        </TelemetryWidget>
      )}
      
      {/* Tasks Widget */}
      {widgetToggles.tasks && (
        <TelemetryWidget 
          title="Care Plan" 
          icon={<GanttChart size={18} />}
          position={tasksWidget.position}
          onMouseDown={tasksWidget.onMouseDown}
          ref={tasksWidget.dragRef}
        >
          <CareTaskWidget />
        </TelemetryWidget>
      )}
      
      {/* Activity Widget */}
      {widgetToggles.activity && (
        <TelemetryWidget 
          title="Activity Log" 
          icon={<ListOrdered size={18} />}
          position={activityWidget.position}
          onMouseDown={activityWidget.onMouseDown}
          ref={activityWidget.dragRef}
        >
          <ActivityLogWidget logs={mockActivityLogs} />
        </TelemetryWidget>
      )}
      
      {/* Graph Widget - Fixed height, moved to middle right */}
      {widgetToggles.graph && (
        <TelemetryWidget 
          title="Monitoring History" 
          icon={<LineChart size={18} />}
          position={graphWidget.position}
          onMouseDown={graphWidget.onMouseDown}
          ref={graphWidget.dragRef}
          widthClass="w-[500px]"
          heightClass="h-[350px]"
        >
          <MiniGraph data={mockGraphData} />
        </TelemetryWidget>
      )}
    </>
  );
};

export default DraggableWidgets;
