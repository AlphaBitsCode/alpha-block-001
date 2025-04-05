
import React, { ReactNode } from "react";

interface TelemetryWidgetProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

const TelemetryWidget: React.FC<TelemetryWidgetProps> = ({
  title,
  icon,
  children,
  className = "",
}) => {
  return (
    <div className={`glassmorphism rounded-lg overflow-hidden animate-fade-in ${className}`}>
      <div className="flex items-center p-3 border-b border-white/10">
        <div className="mr-2 text-white/90">{icon}</div>
        <h3 className="text-sm font-medium text-white/90">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default TelemetryWidget;
