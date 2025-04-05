
import React from "react";
import { Droplets } from "lucide-react";
import TelemetryWidget from "./TelemetryWidget";

interface HumidityWidgetProps {
  humidity: number;
}

const HumidityWidget: React.FC<HumidityWidgetProps> = ({
  humidity,
}) => {
  let statusColor = "text-blue-400";
  if (humidity < 40) statusColor = "text-yellow-400";
  if (humidity < 25) statusColor = "text-red-400";

  return (
    <TelemetryWidget 
      title="Humidity" 
      icon={<Droplets size={18} className="text-blue-400" />}
    >
      <div className="text-3xl font-semibold text-white">
        {humidity}%
      </div>
      <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500" 
          style={{ width: `${humidity}%` }}
        />
      </div>
    </TelemetryWidget>
  );
};

export default HumidityWidget;
