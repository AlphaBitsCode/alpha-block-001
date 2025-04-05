
import React from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { Thermometer, Droplets } from "lucide-react";

interface MetricsOverlayProps {
  temperature: number;
  humidity: number;
  historyData: {
    time: string;
    temperature: number;
    humidity: number;
  }[];
}

const MetricsOverlay: React.FC<MetricsOverlayProps> = ({
  temperature,
  humidity,
  historyData
}) => {
  // Pink oyster optimal temperature range: 20-30°C
  const isTempOptimal = temperature >= 20 && temperature <= 30;
  const tempColor = isTempOptimal ? "text-green-400" : temperature > 30 ? "text-red-400" : "text-yellow-400";
  
  // Pink oyster optimal humidity range: 80-95%
  const isHumidityOptimal = humidity >= 80 && humidity <= 95;
  const humidityColor = isHumidityOptimal ? "text-green-400" : humidity > 95 ? "text-blue-400" : "text-yellow-400";

  return (
    <div className="flex items-end space-x-4">
      {/* Temperature HUD */}
      <div className="flex flex-col items-center">
        <div className="w-20 h-36 relative mb-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={historyData}
              margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="tempColorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="temperature"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#tempColorGradient)"
                strokeWidth={1.5}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className={`flex items-center ${tempColor}`}>
          <Thermometer size={14} className="mr-1" />
          <span className="text-lg font-bold">{temperature}°C</span>
        </div>
      </div>

      {/* Humidity HUD */}
      <div className="flex flex-col items-center">
        <div className="w-20 h-36 relative mb-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={historyData}
              margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="humidityColorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="humidity"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#humidityColorGradient)"
                strokeWidth={1.5}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className={`flex items-center ${humidityColor}`}>
          <Droplets size={14} className="mr-1" />
          <span className="text-lg font-bold">{humidity}%</span>
        </div>
      </div>
    </div>
  );
};

export default MetricsOverlay;
