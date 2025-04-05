
import React from "react";
import { useDraggable, Position } from "@/hooks/use-draggable";
import { Map } from "lucide-react";

interface MiniMapWidgetProps {
  cameraPosition: Position;
  onPositionChange?: (position: Position) => void;
  visible: boolean;
}

const MiniMapWidget: React.FC<MiniMapWidgetProps> = ({ 
  cameraPosition, 
  onPositionChange,
  visible 
}) => {
  const cameraPositionWidget = useDraggable({
    initialPosition: { x: window.innerWidth - 280, y: window.innerHeight - 220 },
    bounds: { bottom: window.innerHeight - 20, right: window.innerWidth - 10 }
  });
  
  if (!visible) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-40" ref={cameraPositionWidget.dragRef} 
         style={{ 
           position: 'absolute', 
           left: `${cameraPositionWidget.position.x}px`, 
           top: `${cameraPositionWidget.position.y}px`
         }}
         onMouseDown={cameraPositionWidget.onMouseDown}>
      <div className="glassmorphism p-1 rounded-md border border-white/20 shadow-lg 
                    dark:bg-black/70 dark:border-white/20 
                    light:bg-white/80 light:border-black/20">
        <div className="flex flex-row gap-2">
          {/* Main minimap with background */}
          <div className="relative w-32 h-32 bg-black/30 dark:bg-black/60 light:bg-black/40 rounded overflow-hidden">
            {/* Minimap background image */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://lakeview.secondbrains.tech/cam/office_4.jpg" 
                alt="Map background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
            
            {/* Grid lines */}
            <div className="absolute inset-0 grid grid-cols-4 gap-0 pointer-events-none z-10">
              {Array(3).fill(0).map((_, i) => (
                <div 
                  key={`v-${i}`} 
                  className="border-r dark:border-white/20 light:border-white/30 h-full" 
                  style={{left: `${(i + 1) * 25}%`}} 
                />
              ))}
              {Array(3).fill(0).map((_, i) => (
                <div 
                  key={`h-${i}`} 
                  className="border-b dark:border-white/20 light:border-white/30 w-full" 
                  style={{top: `${(i + 1) * 25}%`}} 
                />
              ))}
            </div>
            
            {/* Camera position indicator */}
            <div 
              className="absolute w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_5px_rgba(59,130,246,0.7)] z-20"
              style={{ 
                left: `${cameraPosition.x}%`, 
                top: `${cameraPosition.y}%`,
              }}
            />
            
            {/* View cone / Direction indicator */}
            <div 
              className="absolute w-12 h-12 bg-blue-500/20 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ 
                left: `${cameraPosition.x}%`, 
                top: `${cameraPosition.y}%`,
              }}
            />
            
            {/* Position coordinates display */}
            <div className="absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 rounded text-xs text-white/90 font-mono z-20">
              X:{Math.round(cameraPosition.x)}, Y:{Math.round(cameraPosition.y)}
            </div>
            
            <div className="absolute inset-0 border dark:border-white/20 light:border-white/40 rounded pointer-events-none z-10" />
          </div>
          
          {/* Camera preview with refreshing image */}
          <div className="relative w-32 h-32 overflow-hidden rounded-md">
            <img 
              src={`https://lakeview.secondbrains.tech/cam/office_3.jpg?t=${Math.floor(Date.now() / 30000)}`} 
              alt="Camera Feed"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border dark:border-white/20 light:border-white/30 rounded-md pointer-events-none" />
            <div className="absolute bottom-1 left-1 right-1 text-center bg-black/70 text-xs text-white/90 px-1 py-0.5 rounded">
              Live Feed
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center px-1 py-1">
          <div className="text-xs text-foreground font-medium">Camera Position</div>
        </div>
      </div>
    </div>
  );
};

export default MiniMapWidget;
