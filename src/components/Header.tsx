
import React from "react";
import { Clock, MapPin } from "lucide-react";

interface HeaderProps {
  unitId: string;
}

const Header: React.FC<HeaderProps> = ({ unitId }) => {
  const [currentTime, setCurrentTime] = React.useState<string>("");
  const [currentDate, setCurrentDate] = React.useState<string>("");
  const timezone = "Asia/Ho_Chi_Minh"; // Vietnam timezone
  const country = "Vietnam";
  const cultivationStart = "1st Apr 2025";

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: timezone
      });
      const dateString = now.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: timezone
      });
      setCurrentTime(`${timeString}`);
      setCurrentDate(dateString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glassmorphism fixed top-0 left-0 right-0 flex items-center justify-between h-16 px-6 z-50">
      <div className="flex items-center space-x-2">
        <div className="font-bold text-xl text-white">Alpha Block</div>
        <div className="bg-white/10 px-3 py-1 rounded-md text-sm text-white/90">
          Unit #{unitId}
        </div>
        <div className="bg-pink-500/20 px-3 py-1 rounded-md text-sm text-white/90">
          Pink Oyster
        </div>
        <div className="bg-white/10 px-3 py-1 rounded-md text-sm text-white/90">
          Cycle: {cultivationStart}
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-white/90">
        <div className="flex items-center">
          <MapPin size={16} className="mr-1.5" />
          <span>{country}</span>
        </div>
        <div className="flex items-center">
          <Clock size={16} className="mr-1.5" />
          <div className="flex flex-col items-end">
            <span className="text-sm">{currentTime}</span>
            <span className="text-xs text-white/70">{currentDate} ({timezone.split('/')[1]})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
