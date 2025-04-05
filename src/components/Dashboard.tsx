
import React from "react";
import Header from "./Header";
import VideoFeed from "./VideoFeed";
import TemperatureWidget from "./TemperatureWidget";
import HumidityWidget from "./HumidityWidget";
import MushroomHealthWidget from "./MushroomHealthWidget";
import BatteryWidget from "./BatteryWidget";
import ActivityLogWidget from "./ActivityLogWidget";
import MiniGraph from "./MiniGraph";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample data - in a real app this would come from an API
const mockActivityLogs = [
  { id: "1", message: "Fan started", timestamp: "2 min ago", type: "info" },
  { id: "2", message: "Door opened", timestamp: "15 min ago", type: "info" },
  { id: "3", message: "Humidity alert", timestamp: "1 hour ago", type: "warning" },
  { id: "4", message: "New growth detected", timestamp: "2 hours ago", type: "info" },
  { id: "5", message: "Temperature low", timestamp: "3 hours ago", type: "warning" },
];

const mockGraphData = [
  { time: "00:00", temperature: 23, humidity: 85 },
  { time: "04:00", temperature: 22, humidity: 82 },
  { time: "08:00", temperature: 22.5, humidity: 80 },
  { time: "12:00", temperature: 24, humidity: 78 },
  { time: "16:00", temperature: 25, humidity: 75 },
  { time: "20:00", temperature: 24, humidity: 80 },
  { time: "Now", temperature: 23, humidity: 82 },
];

const Dashboard: React.FC = () => {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
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
        <TemperatureWidget temperature={23.5} trend="stable" />
        <HumidityWidget humidity={82} />
        <MushroomHealthWidget status="healthy" lastUpdated="10 min ago" />
        <BatteryWidget percentage={78} isCharging={true} />
        <ActivityLogWidget logs={mockActivityLogs} />
        <MiniGraph data={mockGraphData} />
      </div>
      
      {/* Left Widgets (Desktop Only) */}
      {!isMobile && (
        <div className="fixed top-20 left-4 bottom-4 z-40 w-80 flex flex-col space-y-4 overflow-y-auto pb-4">
          <MushroomHealthWidget status="healthy" lastUpdated="10 min ago" />
          <ActivityLogWidget logs={mockActivityLogs} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
