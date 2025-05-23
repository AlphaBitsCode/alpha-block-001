
import React, { ReactNode, useState, forwardRef } from "react";
import { Minimize2, Maximize2 } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Position } from "@/hooks/use-draggable";

interface TelemetryWidgetProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  position?: Position; // Make position optional
  isCollapsed?: boolean;
  onMinimizeClick?: () => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  widthClass?: string;
  heightClass?: string;
}

const TelemetryWidget = forwardRef<HTMLDivElement, TelemetryWidgetProps>(({
  title,
  icon,
  children,
  className = "",
  position,
  isCollapsed = false,
  onMinimizeClick,
  onMouseDown,
  widthClass = "w-80",
  heightClass = ""
}, ref) => {
  if (isCollapsed) return null;
  
  // Set default position if undefined
  const positionStyle = position && position.x !== undefined && position.y !== undefined ? {
    left: `${position.x}px`,
    top: `${position.y}px`
  } : {};
  
  return (
    <div 
      className={`glassmorphism absolute rounded-lg overflow-hidden animate-fade-in shadow-lg border border-white/20 ${widthClass} ${heightClass} ${className} z-20`}
      style={positionStyle}
      ref={ref}
    >
      <div 
        className="flex items-center justify-between p-3 border-b border-white/20 dark:bg-black/80 light:bg-white/80 cursor-move"
        onMouseDown={onMouseDown}
        data-drag-handle="true"
      >
        <div className="flex items-center">
          <div className="mr-2 text-foreground/90">{icon}</div>
          <h3 className="text-sm font-semibold text-foreground/90">{title}</h3>
        </div>
        {onMinimizeClick && (
          <Toggle variant="outline" size="sm" onClick={onMinimizeClick} className="h-6 w-6 p-0 rounded-full">
            <Minimize2 size={14} />
          </Toggle>
        )}
      </div>
      <div className="p-4 dark:bg-black/70 light:bg-white/70">
        {children}
      </div>
    </div>
  );
});

TelemetryWidget.displayName = "TelemetryWidget";

export default TelemetryWidget;
