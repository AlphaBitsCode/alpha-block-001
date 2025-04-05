
import React from "react";
import { Droplets } from "lucide-react";
import TelemetryWidget from "./TelemetryWidget";

interface HumidityWidgetProps {
  humidity: number;
}

const HumidityWidget: React.FC<HumidityWidgetProps> = ({
  humidity,
}) => {
  // Pink oyster optimal humidity range: 80-95%
  const isOptimal = humidity >= 80 && humidity <= 95;
  const isTooLow = humidity < 80;
  const isTooHigh = humidity > 95;

  let statusColor = "text-blue-400";
  if (humidity < 80) statusColor = "text-yellow-400";
  if (humidity < 60) statusColor = "text-red-400";

  return (
    <TelemetryWidget 
      title="Humidity" 
      icon={<Droplets size={18} className="text-blue-400" />}
    >
      <div className="text-3xl font-semibold text-white flex justify-between items-center">
        <span>{humidity}%</span>
        <span className="text-xs">
          {isOptimal && <span className="text-green-400">Optimal</span>}
          {isTooLow && <span className="text-yellow-400">Too Low</span>}
          {isTooHigh && <span className="text-blue-400">Too High</span>}
        </span>
      </div>
      <div className="mt-2 text-xs text-white/70">Pink Oyster ideal: 80-95%</div>
      <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div 
          className={`h-full ${isOptimal ? 'bg-green-500' : 'bg-blue-500'}`}
          style={{ width: `${humidity}%` }}
        />
      </div>
    </TelemetryWidget>
  );
};

export default HumidityWidget;
