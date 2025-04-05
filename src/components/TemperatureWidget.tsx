
import React from "react";
import { Thermometer } from "lucide-react";
import TelemetryWidget from "./TelemetryWidget";

interface TemperatureWidgetProps {
  temperature: number;
  trend: "up" | "down" | "stable";
}

const TemperatureWidget: React.FC<TemperatureWidgetProps> = ({
  temperature,
  trend,
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <div className="text-red-400 text-xl">↑</div>;
      case "down":
        return <div className="text-blue-400 text-xl">↓</div>;
      default:
        return <div className="text-gray-400 text-xl">→</div>;
    }
  };

  return (
    <TelemetryWidget 
      title="Temperature" 
      icon={<Thermometer size={18} />}
    >
      <div className="flex items-center justify-between">
        <div className="text-3xl font-semibold text-white">
          {temperature.toFixed(1)}°C
        </div>
        <div>{getTrendIcon()}</div>
      </div>
      <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500" 
          style={{ width: `${(temperature / 40) * 100}%` }}
        />
      </div>
    </TelemetryWidget>
  );
};

export default TemperatureWidget;
