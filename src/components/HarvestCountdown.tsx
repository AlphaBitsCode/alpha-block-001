
import React, { useState, useEffect } from "react";
import { Timer } from "lucide-react";

interface HarvestCountdownProps {
  harvestDate: string; // ISO string format
  minimal?: boolean;
}

const HarvestCountdown: React.FC<HarvestCountdownProps> = ({ 
  harvestDate,
  minimal = true
}) => {
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
  }>({ days: 0, hours: 0 });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const targetDate = new Date(harvestDate);
      const difference = targetDate.getTime() - now.getTime();
      
      // If the target date is in the past
      if (difference < 0) {
        setTimeRemaining({ days: 0, hours: 0 });
        return;
      }
      
      // Calculate remaining time
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      setTimeRemaining({ days, hours });
    };
    
    // Initial calculation
    calculateTimeRemaining();
    
    // Update the countdown every hour
    const intervalId = setInterval(calculateTimeRemaining, 3600000); // Every hour instead of minute
    
    return () => clearInterval(intervalId);
  }, [harvestDate]);
  
  return (
    <div className="text-white drop-shadow-lg flex items-center">
      <Timer size={16} className="mr-2 text-primary" />
      <span className="text-sm font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
        Harvest in: {timeRemaining.days}d {timeRemaining.hours}h
      </span>
    </div>
  );
};

export default HarvestCountdown;
