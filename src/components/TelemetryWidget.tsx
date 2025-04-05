
import React, { ReactNode, useState } from "react";
import { Minimize2, Maximize2 } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Position } from "@/hooks/use-draggable";

interface TelemetryWidgetProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  position: Position;
  isCollapsed?: boolean;
  onMinimizeClick?: () => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  widthClass?: string;
}

const TelemetryWidget: React.FC<TelemetryWidgetProps> = ({
  title,
  icon,
  children,
  className = "",
  position,
  isCollapsed = false,
  onMinimizeClick,
  onMouseDown,
  widthClass = "w-80"
}) => {
  if (isCollapsed) return null;
  
  return (
    <div 
      className={`glassmorphism absolute rounded-lg overflow-hidden animate-fade-in shadow-lg border border-white/10 ${widthClass} ${className}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      <div 
        className="flex items-center justify-between p-3 border-b border-white/10 cursor-move"
        onMouseDown={onMouseDown}
        data-drag-handle="true"
      >
        <div className="flex items-center">
          <div className="mr-2 text-foreground/90">{icon}</div>
          <h3 className="text-sm font-medium text-foreground/90">{title}</h3>
        </div>
        {onMinimizeClick && (
          <Toggle variant="outline" size="sm" onClick={onMinimizeClick} className="h-6 w-6 p-0 rounded-full">
            <Minimize2 size={14} />
          </Toggle>
        )}
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default TelemetryWidget;
