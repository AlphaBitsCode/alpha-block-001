
import React, { ReactNode } from "react";
import { Minimize2 } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

interface TelemetryWidgetProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMinimizeClick?: () => void;
}

const TelemetryWidget: React.FC<TelemetryWidgetProps> = ({
  title,
  icon,
  children,
  className = "",
  onMouseDown,
  onMinimizeClick
}) => {
  return (
    <div className={`glassmorphism rounded-lg overflow-hidden animate-fade-in ${className}`}>
      <div 
        className="flex items-center justify-between p-3 border-b border-white/10 cursor-move"
        onMouseDown={onMouseDown}
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
