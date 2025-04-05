
import React from "react";
import { Position } from "@/hooks/use-draggable";

interface MiniMapProps {
  position: Position;
  visible?: boolean;
}

const MiniMap: React.FC<MiniMapProps> = ({ position, visible = true }) => {
  // Convert the position (0-100) to the map position (0-100%)
  const mapX = position.x;
  const mapY = position.y;
  
  if (!visible) return null;
  
  return (
    <div className="fixed top-20 left-4 z-40 glassmorphism p-1 rounded-md border border-white/10 shadow-lg">
      <div className="relative w-32 h-32 bg-black/40 rounded overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-4 gap-0 pointer-events-none">
          {Array(3).fill(0).map((_, i) => (
            <div key={`v-${i}`} className="border-r border-white/10 h-full" style={{left: `${(i + 1) * 25}%`}} />
          ))}
          {Array(3).fill(0).map((_, i) => (
            <div key={`h-${i}`} className="border-b border-white/10 w-full" style={{top: `${(i + 1) * 25}%`}} />
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
        
        <div className="absolute inset-0 border border-white/20 rounded pointer-events-none" />
      </div>
    </div>
  );
};

export default MiniMap;
