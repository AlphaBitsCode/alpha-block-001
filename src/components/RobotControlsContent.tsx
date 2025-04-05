
import React, { useState, useRef, useEffect } from "react";
import { Move } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Position } from "@/hooks/use-draggable";

interface RobotControlsContentProps {
  initialPosition: Position;
  onPositionChange?: (position: Position) => void;
}

const RobotControlsContent: React.FC<RobotControlsContentProps> = ({
  initialPosition,
  onPositionChange
}) => {
  const [position, setPosition] = useState<Position>(initialPosition);
  const canvasRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Handle position update
  const updatePosition = (clientX: number, clientY: number) => {
    if (!canvasRef.current || !markerRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    
    setPosition({ x, y });
    if (onPositionChange) onPositionChange({ x, y });
  };
  
  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX, e.clientY);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX, e.clientY);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    updatePosition(e.touches[0].clientX, e.touches[0].clientY);
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  // Add global event listeners
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);
  
  return (
    <div className="p-4">
      <div className="text-sm text-white/80 mb-4">
        Drag the marker to reposition the camera. Current position: X: {position.x.toFixed(1)}, Y: {position.y.toFixed(1)}
      </div>
      
      <div 
        ref={canvasRef}
        className="relative w-full aspect-square bg-black/30 border border-white/20 rounded-md cursor-pointer"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-4 gap-0 pointer-events-none">
          {Array(3).fill(0).map((_, i) => (
            <div key={`v-${i}`} className="border-r border-white/10 h-full" style={{left: `${(i + 1) * 25}%`}} />
          ))}
          {Array(3).fill(0).map((_, i) => (
            <div key={`h-${i}`} className="border-b border-white/10 w-full" style={{top: `${(i + 1) * 25}%`}} />
          ))}
        </div>
        
        {/* Camera position marker */}
        <div
          ref={markerRef}
          className={cn(
            "absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/80",
            "bg-blue-500/60 backdrop-blur-sm flex items-center justify-center",
            "shadow-lg shadow-blue-500/30",
            isDragging ? "scale-125" : "scale-100",
            "transition-transform duration-150"
          )}
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`
          }}
        >
          <Move className="w-3 h-3 text-white" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            setPosition(initialPosition);
            if (onPositionChange) onPositionChange(initialPosition);
          }}
        >
          Reset Position
        </Button>
        <Button 
          variant="default" 
          size="sm"
        >
          Apply Changes
        </Button>
      </div>
    </div>
  );
};

export default RobotControlsContent;
