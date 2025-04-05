
import React from "react";
import { Move } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Position } from "@/hooks/use-draggable";

interface RobotControlsWidgetProps {
  initialPosition?: Position;
  onPositionChange?: (position: Position) => void;
  onOpenDialog: () => void;
  isDialogOpen?: boolean; // Add this prop to track dialog state
}

const RobotControlsWidget: React.FC<RobotControlsWidgetProps> = ({
  onOpenDialog,
  isDialogOpen = false
}) => {
  return (
    <Button 
      variant={isDialogOpen ? "secondary" : "outline"} 
      size="sm" 
      className="flex gap-2" 
      onClick={onOpenDialog}
    >
      <Move size={16} />
      Robot Controls
    </Button>
  );
};

export default RobotControlsWidget;
