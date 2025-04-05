
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
  // Pink oyster optimal temperature range: 18-30°C
  const isOptimal = temperature >= 18 && temperature <= 30;
  const isTooHigh = temperature > 30;
  const isTooLow = temperature < 18;
  
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
        <div className="flex flex-col items-end">
          <div>{getTrendIcon()}</div>
          {isOptimal && <span className="text-xs text-green-400">Optimal</span>}
          {isTooHigh && <span className="text-xs text-red-400">Too High</span>}
          {isTooLow && <span className="text-xs text-blue-400">Too Low</span>}
        </div>
      </div>
      <div className="mt-2 text-xs text-white/70">Pink Oyster ideal: 18-30°C</div>
      <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div 
          className={`h-full ${isOptimal ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 via-green-500 to-red-500'}`}
          style={{ width: `${(temperature / 40) * 100}%` }}
        />
      </div>
    </TelemetryWidget>
  );
};

export default TemperatureWidget;
