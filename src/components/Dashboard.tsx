import React, { useState, useEffect } from "react";
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
import UserNamePrompt from "./UserNamePrompt";
import RobotControlsContent from "./RobotControlsContent";

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

  // Widget visibility state - updated to only show metrics by default
  const [widgetToggles, setWidgetToggles] = useState<WidgetToggleState>({
    metrics: true,
    tasks: false,
    activity: false,
    graph: false,
    minimap: true
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
    initialPosition: { x: window.innerWidth - 400, y: 320 },
    bounds: { top: 70, right: window.innerWidth - 10 }
  });
  
  // New draggable hook for camera position widget
  const cameraPositionWidget = useDraggable({
    initialPosition: { x: 20, y: window.innerHeight - 220 },
    bounds: { bottom: window.innerHeight - 20, left: 10 }
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

  // Pre-load the RobotControlsContent to prevent flashing
  useEffect(() => {
    // This ensures the component is loaded before it's needed
    import('./RobotControlsContent').catch(console.error);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Video Feed */}
      <VideoFeed />
      
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-3 md:px-6">
        <Header unitId="AB-001" startDate="Apr 1, 2025" cropName="Pink Oyster" />
      </div>
      
      {/* User Name Prompt */}
      <UserNamePrompt />
      
      {/* Toaster for notifications */}
      <Toaster position="top-center" />
      
      {/* Fixed MiniMap in bottom-left corner */}
      <div className="fixed bottom-4 left-4 z-40" ref={cameraPositionWidget.dragRef} 
           style={{ 
             position: 'absolute', 
             left: `${cameraPositionWidget.position.x}px`, 
             top: `${cameraPositionWidget.position.y}px`
           }}
           onMouseDown={cameraPositionWidget.onMouseDown}>
        <div className="glassmorphism p-1 rounded-md border border-white/10 shadow-lg 
                      dark:bg-black/40 dark:border-white/10 
                      light:bg-white/70 light:border-white/20">
          <div className="flex flex-row gap-2">
            {/* Main minimap */}
            <div className="relative w-32 h-32 bg-black/20 dark:bg-black/40 light:bg-white/30 rounded overflow-hidden">
              {/* Grid lines */}
              <div className="absolute inset-0 grid grid-cols-4 gap-0 pointer-events-none">
                {Array(3).fill(0).map((_, i) => (
                  <div 
                    key={`v-${i}`} 
                    className="border-r dark:border-white/10 light:border-black/10 h-full" 
                    style={{left: `${(i + 1) * 25}%`}} 
                  />
                ))}
                {Array(3).fill(0).map((_, i) => (
                  <div 
                    key={`h-${i}`} 
                    className="border-b dark:border-white/10 light:border-black/10 w-full" 
                    style={{top: `${(i + 1) * 25}%`}} 
                  />
                ))}
              </div>
              
              {/* Camera position indicator */}
              <div 
                className="absolute w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_5px_rgba(59,130,246,0.7)]"
                style={{ 
                  left: `${cameraPosition.x}%`, 
                  top: `${cameraPosition.y}%`,
                }}
              />
              
              {/* View cone / Direction indicator */}
              <div 
                className="absolute w-12 h-12 bg-blue-500/20 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  left: `${cameraPosition.x}%`, 
                  top: `${cameraPosition.y}%`,
                }}
              />
              
              {/* Position coordinates display */}
              <div className="absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 rounded text-xs text-white/90 font-mono">
                X:{Math.round(cameraPosition.x)}, Y:{Math.round(cameraPosition.y)}
              </div>
              
              <div className="absolute inset-0 border dark:border-white/20 light:border-black/10 rounded pointer-events-none" />
            </div>
            
            {/* Camera preview */}
            <div className="relative w-32 h-32 overflow-hidden rounded-md">
              <img 
                src={`https://lakeview.secondbrains.tech/cam/office_3.jpg?t=${Date.now()}`} 
                alt="Camera Feed"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border dark:border-white/10 light:border-black/10 rounded-md pointer-events-none" />
              <div className="absolute bottom-1 left-1 right-1 text-center bg-black/50 text-xs text-white/90 px-1 py-0.5 rounded">
                Live Feed
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center px-1 py-1">
            <div className="text-xs text-foreground font-medium">Camera Position</div>
            {/* Handle for drag */}
            <div className="cursor-move bg-primary/30 rounded-sm px-2 text-xs text-foreground/80">
              Move
            </div>
          </div>
        </div>
      </div>
      
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
        isRobotControlsOpen={showRobotControls}
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
          
          {/* Graph Widget */}
          {widgetToggles.graph && (
            <TelemetryWidget 
              title="Monitoring History" 
              icon={<LineChart size={18} />}
              position={graphWidget.position}
              onMouseDown={graphWidget.onMouseDown}
              ref={graphWidget.dragRef}
              widthClass="w-[500px]"
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
  
  // Robot Control Dialog function
  function RobotControlDialog() {
    if (isMobile) {
      return (
        <Drawer open={showRobotControls} onOpenChange={setShowRobotControls}>
          <DrawerContent className="bg-black/90 border-t border-white/20 text-white">
            <DrawerHeader>
              <DrawerTitle>Camera Position Controls</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <RobotControlsContent 
                initialPosition={cameraPosition}
                onPositionChange={handleRobotControlPositionChange}
              />
            </div>
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
          <div>
            <RobotControlsContent 
              initialPosition={cameraPosition}
              onPositionChange={handleRobotControlPositionChange}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  };
};

export default Dashboard;
