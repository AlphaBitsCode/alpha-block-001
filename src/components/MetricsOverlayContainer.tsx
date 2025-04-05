
import React from "react";
import MetricsOverlay from "./MetricsOverlay";
import HarvestCountdown from "./HarvestCountdown";

interface MetricsOverlayContainerProps {
  temperature: number;
  humidity: number;
  historyData: any[];
  harvestDate: string;
}

const MetricsOverlayContainer: React.FC<MetricsOverlayContainerProps> = ({
  temperature,
  humidity,
  historyData,
  harvestDate
}) => {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-30">
      <div className="flex flex-col space-y-4">
        {/* Harvest Countdown - moved above temperature/humidity */}
        <HarvestCountdown harvestDate={harvestDate} />
        
        {/* MetricsOverlay with reduced height */}
        <MetricsOverlay 
          temperature={temperature}
          humidity={humidity}
          historyData={historyData}
          heightClass="h-[80px]" // Reduced height
        />
      </div>
    </div>
  );
};

export default MetricsOverlayContainer;
