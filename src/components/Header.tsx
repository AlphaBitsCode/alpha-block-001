
import React from "react";
import { Clock } from "lucide-react";

interface HeaderProps {
  unitId: string;
}

const Header: React.FC<HeaderProps> = ({ unitId }) => {
  const [currentTime, setCurrentTime] = React.useState<string>("");

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
      });
      const dateString = now.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      setCurrentTime(`${dateString} | ${timeString}`);
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
      </div>
      
      <div className="flex items-center space-x-2 text-white/90">
        <Clock size={16} />
        <span>{currentTime}</span>
      </div>
    </div>
  );
};

export default Header;
