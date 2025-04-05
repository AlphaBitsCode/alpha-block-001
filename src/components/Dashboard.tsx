import React, { useState } from "react";
import Header from "./Header";
import VideoFeed from "./VideoFeed";
import ConsolidatedMetricsWidget from "./ConsolidatedMetricsWidget";
import ActivityLogWidget from "./ActivityLogWidget";
import MiniGraph from "./MiniGraph";
import CareTaskWidget from "./CareTaskWidget";
import { useIsMobile } from "@/hooks/use-mobile";
import { Fan, Droplets, AlertCircle, ThermometerIcon, Check, ListOrdered, GanttChart, Settings, LineChart } from "lucide-react";
import MetricsOverlay from "./MetricsOverlay";
import TelemetryWidget from "./TelemetryWidget";
import VerticalToolbar, { WidgetToggleState } from "./VerticalToolbar";
import { useDraggable, Position } from "@/hooks/use-draggable";
import WidgetIcon from "./WidgetIcon";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Toaster } from "sonner";
import MiniMap from "./MiniMap";
import UserNamePrompt from "./UserNamePrompt";
import NavigationMenuComponent from "./NavigationMenu";

// Sample data - in a real app this would come from an API
const mockActivityLogs = [
  { 
    id: "1", 
    message: "Humidity dropped below 70%, humidifier activated", 
    timestamp: "2 min ago", 
    type: "warning" as const,
    icon: <Droplets size={16} className="text-yellow-400" />
  },
  { 
    id: "2", 
    message: "Humidifier running at 80% capacity", 
    timestamp: "1 min ago", 
    type: "info" as const,
    icon: <Fan size={16} className="text-blue-400" />
  },
  { 
    id: "3", 
    message: "Humidity levels restored to optimal range", 
    timestamp: "Just now", 
    type: "success" as const,
    icon: <Check size={16} className="text-green-400" />
  },
  { 
    id: "4", 
    message: "Temperature adjustment initiated", 
    timestamp: "15 min ago", 
    type: "info" as const,
    icon: <ThermometerIcon size={16} className="text-blue-400" />
  },
  { 
    id: "5", 
    message: "New growth detected in section A3", 
    timestamp: "1 hour ago", 
    type: "info" as const,
    icon: <Check size={16} className="text-green-400" />
  },
];

// Mock graph data
const mockGraphData = [
  { time: "00:00", temperature: 27, humidity: 85 },
  { time: "04:00", temperature: 26, humidity: 82 },
  { time: "08:00", temperature: 28, humidity: 84 },
  { time: "12:00", temperature: 30, humidity: 78 },
  { time: "16:00", temperature: 31, humidity: 75 },
  { time: "20:00", temperature: 29, humidity: 80 },
  { time: "Now", temperature: 28.5, humidity: 82 },
];

const Dashboard: React.FC = () => {
  const isMobile = useIsMobile();
  const [isHumidifierOn, setIsHumidifierOn] = useState(true);
  const [isLightOn, setIsLightOn] = useState(false);
  const [showRobotControls, setShowRobotControls] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<Position>({ x: 50, y: 50 });

  // Widget visibility state
  const [widgetToggles, setWidgetToggles] = useState<WidgetToggleState>({
    metrics: true,
    tasks: true,
    activity: true,
    graph: true
  });

  // Draggable hooks for each widget
  const metricsWidget = useDraggable({ 
    initialPosition: { x: 20, y: 80 },
    bounds: { top: 70, left: 10 }
  });
  
  const tasksWidget = useDraggable({ 
    initialPosition: { x: 20, y: 320 },
    bounds: { top: 70, left: 10 }
  });
  
  const activityWidget = useDraggable({ 
    initialPosition: { x: window.innerWidth - 330, y: 80 },
    bounds: { top: 70, right: window.innerWidth - 10 }
  });
  
  const graphWidget = useDraggable({ 
    initialPosition: { x: window.innerWidth - 330, y: 320 },
    bounds: { top: 70, right: window.innerWidth - 10 }
  });

  const toggleHumidifier = () => {
    setIsHumidifierOn(!isHumidifierOn);
  };

  const toggleLight = () => {
    setIsLightOn(!isLightOn);
  };
  
  const handleRobotControlPositionChange = (position: Position) => {
    setCameraPosition(position);
  };

  // Metrics data - would come from API in real app
  const metricsData = {
    temperature: 28.5, // in Celsius
    humidity: 82, // in percentage
    batteryPercentage: 78,
    isCharging: true,
    lightingLevel: 65, // in percentage
    mushroomHealth: "healthy" as const,
    lastUpdated: "2 min ago"
  };

  const handleOpenRobotControls = () => {
    setShowRobotControls(true);
  };

  const RobotControlDialog = () => {
    const RobotControlContent = React.lazy(() => import('./RobotControlsContent'));
    
    if (isMobile) {
      return (
        <Drawer open={showRobotControls} onOpenChange={setShowRobotControls}>
          <DrawerContent className="bg-black/90 border-t border-white/20 text-white">
            <DrawerHeader>
              <DrawerTitle>Camera Position Controls</DrawerTitle>
            </DrawerHeader>
            <React.Suspense fallback={<div className="p-4">Loading controls...</div>}>
              <RobotControlContent 
                initialPosition={cameraPosition}
                onPositionChange={handleRobotControlPositionChange}
              />
            </React.Suspense>
          </DrawerContent>
        </Drawer>
      );
    }
    
    return (
      <Dialog open={showRobotControls} onOpenChange={setShowRobotControls}>
        <DialogContent className="bg-black/90 border border-white/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Camera Position Controls</DialogTitle>
          </DialogHeader>
          <React.Suspense fallback={<div className="p-4">Loading controls...</div>}>
            <RobotControlContent 
              initialPosition={cameraPosition}
              onPositionChange={handleRobotControlPositionChange}
            />
          </React.Suspense>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Video Feed */}
      <VideoFeed />
      
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-3 md:px-6">
        <Header unitId="AB-001" />
        <NavigationMenuComponent />
      </div>
      
      {/* User Name Prompt */}
      <UserNamePrompt />
      
      {/* Toaster for notifications */}
      <Toaster position="top-center" />
      
      {/* Mini Map */}
      <MiniMap position={cameraPosition} />
      
      {/* Robot Controls Dialog/Drawer */}
      <RobotControlDialog />
      
      {/* Vertical Toolbar */}
      <VerticalToolbar 
        widgetToggles={widgetToggles} 
        setWidgetToggles={setWidgetToggles}
        isHumidifierOn={isHumidifierOn}
        toggleHumidifier={toggleHumidifier}
        isLightOn={isLightOn}
        toggleLight={toggleLight}
        onOpenRobotControls={handleOpenRobotControls}
      />
      
      {/* HUD-style Metrics Overlay */}
      <MetricsOverlay 
        temperature={metricsData.temperature}
        humidity={metricsData.humidity}
        historyData={mockGraphData}
      />
      
      {/* Draggable Widgets */}
      {!isMobile && (
        <>
          {/* Metrics Widget */}
          {metricsWidget.isCollapsed && widgetToggles.metrics ? (
            <WidgetIcon 
              icon={Settings} 
              label="Metrics" 
              onClick={metricsWidget.toggleCollapse}
              position={metricsWidget.position}
            />
          ) : widgetToggles.metrics && (
            <TelemetryWidget 
              title="System Metrics" 
              icon={<Settings size={18} />}
              position={metricsWidget.position}
              isCollapsed={!widgetToggles.metrics}
              onMinimizeClick={metricsWidget.toggleCollapse}
              onMouseDown={metricsWidget.onMouseDown}
              ref={metricsWidget.dragRef}
            >
              <ConsolidatedMetricsWidget {...metricsData} />
            </TelemetryWidget>
          )}
          
          {/* Tasks Widget */}
          {tasksWidget.isCollapsed && widgetToggles.tasks ? (
            <WidgetIcon 
              icon={GanttChart} 
              label="Tasks" 
              onClick={tasksWidget.toggleCollapse}
              position={tasksWidget.position}
            />
          ) : widgetToggles.tasks && (
            <TelemetryWidget 
              title="Care Tasks" 
              icon={<GanttChart size={18} />}
              position={tasksWidget.position}
              isCollapsed={!widgetToggles.tasks}
              onMinimizeClick={tasksWidget.toggleCollapse}
              onMouseDown={tasksWidget.onMouseDown}
              ref={tasksWidget.dragRef}
            >
              <CareTaskWidget />
            </TelemetryWidget>
          )}
          
          {/* Activity Widget */}
          {activityWidget.isCollapsed && widgetToggles.activity ? (
            <WidgetIcon 
              icon={ListOrdered} 
              label="Activity Log" 
              onClick={activityWidget.toggleCollapse}
              position={activityWidget.position}
            />
          ) : widgetToggles.activity && (
            <TelemetryWidget 
              title="Activity Log" 
              icon={<ListOrdered size={18} />}
              position={activityWidget.position}
              isCollapsed={!widgetToggles.activity}
              onMinimizeClick={activityWidget.toggleCollapse}
              onMouseDown={activityWidget.onMouseDown}
              ref={activityWidget.dragRef}
            >
              <ActivityLogWidget logs={mockActivityLogs} />
            </TelemetryWidget>
          )}
          
          {/* Graph Widget */}
          {graphWidget.isCollapsed && widgetToggles.graph ? (
            <WidgetIcon 
              icon={LineChart} 
              label="Performance Graph" 
              onClick={graphWidget.toggleCollapse}
              position={graphWidget.position}
            />
          ) : widgetToggles.graph && (
            <TelemetryWidget 
              title="Performance Graph" 
              icon={<LineChart size={18} />}
              position={graphWidget.position}
              isCollapsed={!widgetToggles.graph}
              onMinimizeClick={graphWidget.toggleCollapse}
              onMouseDown={graphWidget.onMouseDown}
              ref={graphWidget.dragRef}
              widthClass="w-96"
            >
              <MiniGraph data={mockGraphData} />
            </TelemetryWidget>
          )}
        </>
      )}
      
      {/* Mobile Widgets (simplified) */}
      {isMobile && (
        <div className="fixed top-20 right-4 bottom-4 z-40 w-80 flex flex-col space-y-4 overflow-y-auto pb-4">
          {widgetToggles.metrics && <ConsolidatedMetricsWidget {...metricsData} />}
          {widgetToggles.tasks && <CareTaskWidget />}
          {widgetToggles.activity && <ActivityLogWidget logs={mockActivityLogs} />}
          {widgetToggles.graph && <MiniGraph data={mockGraphData} />}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
