
import React, { useState, useEffect } from "react";
import { Timer } from "lucide-react";

interface HarvestCountdownProps {
  harvestDate: string; // ISO string format
}

const HarvestCountdown: React.FC<HarvestCountdownProps> = ({ harvestDate }) => {
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
  }>({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const targetDate = new Date(harvestDate);
      const difference = targetDate.getTime() - now.getTime();
      
      // If the target date is in the past
      if (difference < 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0 });
        return;
      }
      
      // Calculate remaining time
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeRemaining({ days, hours, minutes });
    };
    
    // Initial calculation
    calculateTimeRemaining();
    
    // Update the countdown every minute
    const intervalId = setInterval(calculateTimeRemaining, 60000);
    
    return () => clearInterval(intervalId);
  }, [harvestDate]);
  
  return (
    <div className="glassmorphism flex items-center bg-black/60 px-3 py-1.5 rounded-md text-sm text-foreground/90 whitespace-nowrap">
      <Timer size={16} className="mr-2" />
      <span>
        Harvest in: {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m
      </span>
    </div>
  );
};

export default HarvestCountdown;
