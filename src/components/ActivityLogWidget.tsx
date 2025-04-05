
import React from "react";
import { ListOrdered, Clock } from "lucide-react";
import TelemetryWidget from "./TelemetryWidget";

interface LogEntry {
  id: string;
  message: string;
  timestamp: string;
  type: "info" | "warning" | "error";
}

interface ActivityLogWidgetProps {
  logs: LogEntry[];
}

const ActivityLogWidget: React.FC<ActivityLogWidgetProps> = ({
  logs,
}) => {
  const getLogTypeIcon = (type: LogEntry["type"]) => {
    switch (type) {
      case "warning":
        return <span className="w-2 h-2 rounded-full bg-yellow-400"></span>;
      case "error":
        return <span className="w-2 h-2 rounded-full bg-red-400"></span>;
      default:
        return <span className="w-2 h-2 rounded-full bg-blue-400"></span>;
    }
  };

  return (
    <TelemetryWidget 
      title="Activity Log" 
      icon={<ListOrdered size={18} />}
      className="min-h-[250px]"
    >
      <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start py-1.5 border-b border-white/5">
            <div className="mr-2 mt-1.5">
              {getLogTypeIcon(log.type)}
            </div>
            <div className="flex-1 text-sm">
              <div className="text-white/90">{log.message}</div>
              <div className="text-xs text-white/50 flex items-center mt-0.5">
                <Clock size={10} className="mr-1" /> {log.timestamp}
              </div>
            </div>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-center text-white/50 py-8">
            No recent activity
          </div>
        )}
      </div>
    </TelemetryWidget>
  );
};

export default ActivityLogWidget;
