
import React, { useState, useEffect } from "react";
import { Position } from "@/hooks/use-draggable";

interface MiniMapProps {
  position: Position;
  visible?: boolean;
}

const MiniMap: React.FC<MiniMapProps> = ({ position, visible = true }) => {
  // Convert the position (0-100) to the map position (0-100%)
  const mapX = position.x;
  const mapY = position.y;
  
  const [timestamp, setTimestamp] = useState(Date.now());
  const [isImageLoading, setIsImageLoading] = useState(true);
  
  useEffect(() => {
    // Set up refresh interval (30 seconds)
    const refreshInterval = setInterval(() => {
      setTimestamp(Date.now());
    }, 30000); // 30 seconds
    
    return () => {
      clearInterval(refreshInterval);
    };
  }, []);
  
  // Handle image load events
  const handleImageLoad = () => {
    setIsImageLoading(false);
  };
  
  const handleImageError = () => {
    setIsImageLoading(false);
  };
  
  if (!visible) return null;
  
  return (
    <div className="fixed top-20 left-4 z-40 flex flex-col gap-2">
      {/* Title */}
      <div className="text-xs font-medium text-white/90 pl-2">Camera Position</div>
      
      <div className="glassmorphism p-1 rounded-md border border-white/10 shadow-lg 
                     dark:bg-black/40 dark:border-white/10 
                     light:bg-white/70 light:border-white/20">
        {/* Main minimap */}
        <div className="relative w-32 h-32 bg-black/20 dark:bg-black/40 light:bg-white/30 rounded overflow-hidden">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-4 gap-0 pointer-events-none">
            {Array(3).fill(0).map((_, i) => (
              <div 
                key={`v-${i}`} 
                className="border-r dark:border-white/10 light:border-black/10 h-full" 
                style={{left: `${(i + 1) * 25}%`}} 
              />
            ))}
            {Array(3).fill(0).map((_, i) => (
              <div 
                key={`h-${i}`} 
                className="border-b dark:border-white/10 light:border-black/10 w-full" 
                style={{top: `${(i + 1) * 25}%`}} 
              />
            ))}
          </div>
          
          {/* Camera position indicator */}
          <div 
            className="absolute w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_5px_rgba(59,130,246,0.7)]"
            style={{ 
              left: `${mapX}%`, 
              top: `${mapY}%`,
            }}
          />
          
          {/* View cone / Direction indicator */}
          <div 
            className="absolute w-12 h-12 bg-blue-500/20 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              left: `${mapX}%`, 
              top: `${mapY}%`,
            }}
          />
          
          {/* Position coordinates display */}
          <div className="absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 rounded text-xs text-white/90 font-mono">
            X:{Math.round(mapX)}, Y:{Math.round(mapY)}
          </div>
          
          <div className="absolute inset-0 border dark:border-white/20 light:border-black/10 rounded pointer-events-none" />
        </div>
        
        {/* Camera preview */}
        <div className="relative w-32 h-24 mt-1 overflow-hidden rounded-md">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10 text-xs text-white/80">
              Loading...
            </div>
          )}
          <img 
            src={`https://lakeview.secondbrains.tech/cam/office_2.jpg?t=${timestamp}`} 
            alt="Camera Feed"
            className="w-full h-full object-cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          <div className="absolute inset-0 border dark:border-white/10 light:border-black/10 rounded-md pointer-events-none" />
          <div className="absolute bottom-1 left-1 right-1 text-center bg-black/50 text-xs text-white/90 px-1 py-0.5 rounded">
            Live Feed
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniMap;
