
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
  const cultivationStartDate = "April 1, 2025";
  const daysSinceCultivation = Math.floor((new Date().getTime() - new Date("2025-04-01").getTime()) / (1000 * 3600 * 24));
  
  // Pink oyster mushrooms typically fruit in 14-21 days
  const growthStage = daysSinceCultivation <= 7 ? "Colonization" :
                      daysSinceCultivation <= 14 ? "Primordia Formation" :
                      daysSinceCultivation <= 21 ? "Fruiting" : "Harvest";
  
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
      title="Pink Oyster Health" 
      icon={statusInfo.icon}
    >
      <div className={`flex items-center px-3 py-2 rounded-lg ${statusInfo.bgColor}`}>
        <div className="mr-2">{statusInfo.icon}</div>
        <div>
          <div className={`font-medium ${statusInfo.textColor}`}>{statusInfo.label}</div>
          <div className="text-sm text-white/70">{statusInfo.description}</div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="px-2 py-1 bg-pink-500/20 rounded text-xs text-white">
          {growthStage}
        </div>
        <div className="text-xs text-white/70">
          Day {daysSinceCultivation} of cycle
        </div>
      </div>
      <div className="mt-2 text-xs text-white/50 text-right">
        Cycle start: {cultivationStartDate} | Last update: {lastUpdated}
      </div>
    </TelemetryWidget>
  );
};

export default MushroomHealthWidget;
