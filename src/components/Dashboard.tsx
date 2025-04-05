
import React, { useState, useEffect } from "react";
import Header from "./Header";
import VideoFeed from "./VideoFeed";
import { useIsMobile } from "@/hooks/use-mobile";
import { Droplets, Check, Fan } from "lucide-react";
import { useDraggable, Position } from "@/hooks/use-draggable";
import { Toaster } from "sonner";
import UserNamePrompt from "./UserNamePrompt";
import SupportDialog from "./SupportDialog";
import VerticalToolbar from "./VerticalToolbar";
import TopToolbar from "./TopToolbar";
import DraggableWidgets from "./DraggableWidgets";
import RobotControlDialog from "./RobotControlDialog";
import SupportButton from "./SupportButton";
import MetricsOverlayContainer from "./MetricsOverlayContainer";
import MiniMapWidget from "./MiniMapWidget";
import { generateMockGraphData } from "../utils/mockDataGenerator";

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
    icon: <Fan size={16} className="text-blue-400" />
  },
  { 
    id: "5", 
    message: "New growth detected in section A3", 
    timestamp: "1 hour ago", 
    type: "info" as const,
    icon: <Check size={16} className="text-green-400" />
  },
];

const mockGraphData = generateMockGraphData();

const Dashboard: React.FC = () => {
  const isMobile = useIsMobile();
  const [isHumidifierOn, setIsHumidifierOn] = useState(true);
  const [isLightOn, setIsLightOn] = useState(false);
  const [showRobotControls, setShowRobotControls] = useState(false);
  const [showSupportDialog, setShowSupportDialog] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<Position>({ x: 50, y: 50 });
  const [isOverheadCamera, setIsOverheadCamera] = useState(true);

  // Widget visibility state - hide metrics by default
  const [widgetToggles, setWidgetToggles] = useState({
    metrics: false,
    tasks: false,
    activity: false,
    graph: false,
    minimap: true
  });

  const toggleHumidifier = () => {
    setIsHumidifierOn(!isHumidifierOn);
  };

  const toggleLight = () => {
    setIsLightOn(!isLightOn);
  };
  
  const toggleCameraView = () => {
    setIsOverheadCamera(!isOverheadCamera);
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

  const handleOpenSupportDialog = () => {
    setShowSupportDialog(true);
  };

  const toggleMinimapVisibility = () => {
    setWidgetToggles(prev => ({...prev, minimap: !prev.minimap}));
  };

  // Pre-load the RobotControlsContent to prevent flashing
  useEffect(() => {
    // This ensures the component is loaded before it's needed
    import('./RobotControlsContent').catch(console.error);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Video Feed */}
      <VideoFeed isOverheadCamera={isOverheadCamera} />
      
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-3 md:px-6">
        <Header unitId="AB-001" startDate="Apr 1, 2025" cropName="Pink Oyster" />
      </div>
      
      {/* Top Toolbar with Controls */}
      <div className="fixed top-[76px] left-1/2 transform -translate-x-1/2 z-[90] shadow-md">
        <TopToolbar
          isHumidifierOn={isHumidifierOn}
          toggleHumidifier={toggleHumidifier}
          isLightOn={isLightOn}
          toggleLight={toggleLight}
          isOverheadCamera={isOverheadCamera}
          toggleCameraView={toggleCameraView}
          isMobile={isMobile}
        />
      </div>
      
      {/* User Name Prompt */}
      <UserNamePrompt />
      
      {/* Metrics Overlay and Harvest Countdown */}
      <MetricsOverlayContainer 
        temperature={metricsData.temperature}
        humidity={metricsData.humidity}
        historyData={mockGraphData}
        harvestDate="2025-04-15T00:00:00"
      />
      
      {/* Support Button */}
      <SupportButton onClick={handleOpenSupportDialog} />
      
      {/* MiniMap Widget */}
      <MiniMapWidget 
        cameraPosition={cameraPosition}
        onPositionChange={handleRobotControlPositionChange}
        visible={widgetToggles.minimap}
      />
      
      {/* Robot Controls Dialog/Drawer */}
      <RobotControlDialog
        isMobile={isMobile}
        open={showRobotControls}
        onOpenChange={setShowRobotControls}
        initialPosition={cameraPosition}
        onPositionChange={handleRobotControlPositionChange}
      />
      
      {/* Support Dialog */}
      <SupportDialog open={showSupportDialog} onOpenChange={setShowSupportDialog} />
      
      {/* Vertical Toolbar */}
      <VerticalToolbar 
        widgetToggles={widgetToggles} 
        setWidgetToggles={setWidgetToggles}
        onToggleCameraView={toggleCameraView}
        isOverheadCamera={isOverheadCamera}
        onOpenRobotControls={handleOpenRobotControls}
      />
      
      {/* Draggable Widgets */}
      <DraggableWidgets
        isMobile={isMobile}
        widgetToggles={widgetToggles}
        metricsData={metricsData}
        mockActivityLogs={mockActivityLogs}
        mockGraphData={mockGraphData}
      />
    </div>
  );
};

export default Dashboard;
