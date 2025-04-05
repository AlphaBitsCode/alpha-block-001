
import React from "react";
import { BadgeCheck, BadgeAlert, AlertCircle } from "lucide-react";
import TelemetryWidget from "./TelemetryWidget";

type HealthStatus = "healthy" | "warning" | "contaminated";

interface MushroomHealthWidgetProps {
  status: HealthStatus;
  lastUpdated: string;
}

const MushroomHealthWidget: React.FC<MushroomHealthWidgetProps> = ({
  status,
  lastUpdated,
}) => {
  const getStatusInfo = () => {
    switch (status) {
      case "healthy":
        return {
          icon: <BadgeCheck size={20} className="text-status-healthy" />,
          label: "Healthy",
          description: "Growth progressing as expected",
          bgColor: "bg-status-healthy/20",
          textColor: "text-status-healthy"
        };
      case "warning":
        return {
          icon: <BadgeAlert size={20} className="text-status-warning" />,
          label: "Alert",
          description: "Conditions need attention",
          bgColor: "bg-status-warning/20",
          textColor: "text-status-warning"
        };
      case "contaminated":
        return {
          icon: <AlertCircle size={20} className="text-status-alert" />,
          label: "Contaminated",
          description: "Immediate intervention required",
          bgColor: "bg-status-alert/20",
          textColor: "text-status-alert"
        };
      default:
        return {
          icon: <BadgeCheck size={20} className="text-status-healthy" />,
          label: "Healthy",
          description: "Growth progressing as expected",
          bgColor: "bg-status-healthy/20",
          textColor: "text-status-healthy"
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <TelemetryWidget 
      title="Mushroom Health" 
      icon={statusInfo.icon}
    >
      <div className={`flex items-center px-3 py-2 rounded-lg ${statusInfo.bgColor}`}>
        <div className="mr-2">{statusInfo.icon}</div>
        <div>
          <div className={`font-medium ${statusInfo.textColor}`}>{statusInfo.label}</div>
          <div className="text-sm text-white/70">{statusInfo.description}</div>
        </div>
      </div>
      <div className="mt-2 text-xs text-white/50 text-right">
        Last update: {lastUpdated}
      </div>
    </TelemetryWidget>
  );
};

export default MushroomHealthWidget;
