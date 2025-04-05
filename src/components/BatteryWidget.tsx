
import React from "react";
import { Battery, BatteryCharging, BatteryWarning, BatteryFull, BatteryMedium, BatteryLow } from "lucide-react";
import TelemetryWidget from "./TelemetryWidget";

interface BatteryWidgetProps {
  percentage: number;
  isCharging: boolean;
}

const BatteryWidget: React.FC<BatteryWidgetProps> = ({
  percentage,
  isCharging,
}) => {
  const getBatteryIcon = () => {
    if (isCharging) return <BatteryCharging size={18} className="text-green-400" />;
    if (percentage <= 15) return <BatteryLow size={18} className="text-red-400" />;
    if (percentage <= 50) return <BatteryMedium size={18} className="text-yellow-400" />;
    if (percentage >= 90) return <BatteryFull size={18} className="text-green-400" />;
    return <Battery size={18} className="text-blue-400" />;
  };

  const getBatteryColor = () => {
    if (percentage <= 15) return "bg-red-500";
    if (percentage <= 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <TelemetryWidget 
      title="Battery Status" 
      icon={getBatteryIcon()}
    >
      <div className="flex items-end justify-between">
        <div className="text-3xl font-semibold text-white">
          {percentage}%
        </div>
        <div className={`text-sm ${isCharging ? "text-green-400" : "text-white/70"}`}>
          {isCharging ? "Charging" : "On Battery"}
        </div>
      </div>
      <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getBatteryColor()} ${isCharging ? "animate-pulse-slow" : ""}`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </TelemetryWidget>
  );
};

export default BatteryWidget;
