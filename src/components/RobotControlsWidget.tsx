
import React from "react";
import { Move, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Position } from "@/hooks/use-draggable";

interface RobotControlsWidgetProps {
  initialPosition?: Position;
  onPositionChange?: (position: Position) => void;
  onOpenDialog: () => void;
  isDialogOpen?: boolean;
  onToggleMinimap?: () => void;
  isMinimapVisible?: boolean;
  useCase?: 'controls' | 'minimap';
}

const RobotControlsWidget: React.FC<RobotControlsWidgetProps> = ({
  onOpenDialog,
  isDialogOpen = false,
  onToggleMinimap,
  isMinimapVisible = true,
  useCase = 'controls'
}) => {
  if (useCase === 'minimap' && onToggleMinimap) {
    return (
      <Button 
        variant={isMinimapVisible ? "secondary" : "outline"} 
        size="sm" 
        className="flex gap-2 rounded-lg z-[80]" 
        onClick={onToggleMinimap}
      >
        <Map size={16} />
        Map
      </Button>
    );
  }
  
  return (
    <Button 
      variant={isDialogOpen ? "secondary" : "outline"} 
      size="sm" 
      className="flex gap-2 rounded-lg z-[80]" 
      onClick={onOpenDialog}
    >
      <Move size={16} />
      Controls
    </Button>
  );
};

export default RobotControlsWidget;
