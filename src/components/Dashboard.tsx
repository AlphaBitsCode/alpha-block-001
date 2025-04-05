
import React from "react";
import Header from "./Header";
import VideoFeed from "./VideoFeed";
import ConsolidatedMetricsWidget from "./ConsolidatedMetricsWidget";
import ActivityLogWidget from "./ActivityLogWidget";
import MiniGraph from "./MiniGraph";
import { useIsMobile } from "@/hooks/use-mobile";
import { Fan, Droplets, AlertCircle, ThermometerIcon, Check } from "lucide-react";

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

// Tropical weather mock data for Pink Oyster mushrooms
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
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
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

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Video Feed */}
      <VideoFeed />
      
      {/* Header */}
      <Header unitId="AB-127" />
      
      {/* Telemetry Control Button (Mobile) */}
      {isMobile && (
        <button
          className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full glassmorphism flex items-center justify-center"
          onClick={toggleCollapse}
        >
          <span className="text-white text-xl">
            {isCollapsed ? "+" : "−"}
          </span>
        </button>
      )}
      
      {/* Telemetry Widgets */}
      <div 
        className={`fixed top-20 right-4 bottom-4 z-40 w-80 flex flex-col space-y-4 overflow-y-auto pb-4 transition-transform duration-300 
          ${isMobile && isCollapsed ? "translate-x-full" : "translate-x-0"}`}
      >
        <ConsolidatedMetricsWidget {...metricsData} />
        <ActivityLogWidget logs={mockActivityLogs} />
        <MiniGraph data={mockGraphData} />
      </div>
      
      {/* Left Widgets (Desktop Only) */}
      {!isMobile && (
        <div className="fixed top-20 left-4 bottom-4 z-40 w-80 flex flex-col space-y-4 overflow-y-auto pb-4">
          <div className="hidden">
            {/* This is left empty intentionally as we consolidated the widgets */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
