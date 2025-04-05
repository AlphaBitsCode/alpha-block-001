
import React from "react";
import { ThermometerIcon, Droplets } from "lucide-react";

interface MetricsOverlayProps {
  temperature: number;
  humidity: number;
  historyData?: Array<{
    time: string;
    temperature: number;
    humidity: number;
  }>;
  heightClass?: string;
}

const MetricsOverlay: React.FC<MetricsOverlayProps> = ({ 
  temperature, 
  humidity,
  historyData,
  heightClass = "h-[160px]" // Default height, can be overridden
}) => {
  // Pink oyster optimal ranges
  const isTemperatureOptimal = temperature >= 18 && temperature <= 30;
  const isHumidityOptimal = humidity >= 80 && humidity <= 90;
  
  return (
    <div className="flex flex-col space-y-2">
      {/* Temperature Chart */}
      <div className={`glassmorphism rounded-lg px-3 py-2 ${heightClass}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ThermometerIcon size={16} className="mr-2 text-red-400" />
            <span className="text-xs uppercase font-medium">Temperature</span>
          </div>
          <div className="text-xs">
            {isTemperatureOptimal ? 
              <span className="text-green-400">Optimal</span> : 
              <span className="text-yellow-400">Check</span>
            }
          </div>
        </div>
        
        <div className="flex items-end justify-between mt-1">
          <div className="text-2xl font-bold">{temperature.toFixed(1)}°C</div>
        </div>
        
        <div className="w-full mt-1">
          <div className="h-1 w-full bg-white/10 rounded-full">
            <div 
              className={`h-full rounded-full ${isTemperatureOptimal ? 'bg-green-500' : 'bg-yellow-500'}`} 
              style={{ width: `${Math.min(100, (temperature / 40) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-1 opacity-70">
            <div>15°C</div>
            <div>30°C</div>
          </div>
        </div>
      </div>
      
      {/* Humidity Chart */}
      <div className={`glassmorphism rounded-lg px-3 py-2 ${heightClass}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Droplets size={16} className="mr-2 text-blue-400" />
            <span className="text-xs uppercase font-medium">Humidity</span>
          </div>
          <div className="text-xs">
            {isHumidityOptimal ? 
              <span className="text-green-400">Optimal</span> : 
              <span className="text-yellow-400">Check</span>
            }
          </div>
        </div>
        
        <div className="flex items-end justify-between mt-1">
          <div className="text-2xl font-bold">{humidity.toFixed(0)}%</div>
        </div>
        
        <div className="w-full mt-1">
          <div className="h-1 w-full bg-white/10 rounded-full">
            <div 
              className={`h-full rounded-full ${isHumidityOptimal ? 'bg-green-500' : 'bg-yellow-500'}`}
              style={{ width: `${Math.min(100, humidity)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs mt-1 opacity-70">
            <div>50%</div>
            <div>100%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsOverlay;
