
import React from "react";
import { Thermometer, Droplets, Battery, Sun, SunMoon } from "lucide-react";
import TelemetryWidget from "./TelemetryWidget";
import { cn } from "@/lib/utils";

interface MetricsWidgetProps {
  temperature: number;
  humidity: number;
  batteryPercentage: number;
  isCharging: boolean;
  lightingLevel: number; // 0-100
  mushroomHealth: "healthy" | "warning" | "alert";
  lastUpdated: string;
}

const ConsolidatedMetricsWidget: React.FC<MetricsWidgetProps> = ({
  temperature,
  humidity,
  batteryPercentage,
  isCharging,
  lightingLevel,
  mushroomHealth,
  lastUpdated,
}) => {
  // Temperature evaluation for Pink Oyster (optimal range: 20-30°C)
  const isTempOptimal = temperature >= 20 && temperature <= 30;
  const isTempTooLow = temperature < 20;
  const isTempTooHigh = temperature > 30;
  
  // Humidity evaluation (optimal range: 80-95%)
  const isHumidityOptimal = humidity >= 80 && humidity <= 95;
  const isHumidityTooLow = humidity < 80;
  const isHumidityTooHigh = humidity > 95;
  
  // Battery status evaluation
  const getBatteryColor = () => {
    if (batteryPercentage <= 15) return "text-red-400";
    if (batteryPercentage <= 50) return "text-yellow-400";
    return "text-green-400";
  };

  // Mushroom health status evaluation
  const getHealthColor = () => {
    switch (mushroomHealth) {
      case "healthy": return "text-status-healthy";
      case "warning": return "text-status-warning";
      case "alert": return "text-status-alert";
      default: return "text-status-healthy";
    }
  };

  return (
    <TelemetryWidget 
      title="Realtime Metrics" 
      icon={<SunMoon size={18} className="text-blue-400" />}
    >
      <div className="space-y-4">
        {/* Temperature */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer size={16} className={cn(
              isTempOptimal ? "text-green-400" : 
              isTempTooHigh ? "text-red-400" : 
              "text-yellow-400"
            )} />
            <span className="text-white/80">Temperature</span>
          </div>
          <div className="text-white font-medium">
            {temperature}°C
            <span className="ml-2 text-xs">
              {isTempOptimal && <span className="text-green-400">Optimal</span>}
              {isTempTooLow && <span className="text-yellow-400">Too Low</span>}
              {isTempTooHigh && <span className="text-red-400">Too High</span>}
            </span>
          </div>
        </div>
        
        {/* Humidity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets size={16} className={cn(
              isHumidityOptimal ? "text-green-400" : 
              isHumidityTooLow ? "text-yellow-400" : 
              "text-blue-400"
            )} />
            <span className="text-white/80">Humidity</span>
          </div>
          <div className="text-white font-medium">
            {humidity}%
            <span className="ml-2 text-xs">
              {isHumidityOptimal && <span className="text-green-400">Optimal</span>}
              {isHumidityTooLow && <span className="text-yellow-400">Too Low</span>}
              {isHumidityTooHigh && <span className="text-blue-400">Too High</span>}
            </span>
          </div>
        </div>
        
        {/* Battery Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Battery size={16} className={getBatteryColor()} />
            <span className="text-white/80">Battery Status</span>
          </div>
          <div className="text-white font-medium">
            {batteryPercentage}%
            <span className="ml-2 text-xs">
              {isCharging ? <span className="text-green-400">Charging</span> : ""}
            </span>
          </div>
        </div>
        
        {/* Lighting Level */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sun size={16} className="text-yellow-400" />
            <span className="text-white/80">Lighting</span>
          </div>
          <div className="text-white font-medium">
            {lightingLevel}%
          </div>
        </div>
        
        {/* Mushroom Health */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${getHealthColor()}`}></span>
            <span className="text-white/80">Pink Oyster Health</span>
          </div>
          <div className={`text-white font-medium ${getHealthColor()}`}>
            {mushroomHealth.charAt(0).toUpperCase() + mushroomHealth.slice(1)}
          </div>
        </div>
        
        <div className="text-xs text-white/50 text-right pt-2">
          Last updated: {lastUpdated}
        </div>
      </div>
    </TelemetryWidget>
  );
};

export default ConsolidatedMetricsWidget;
