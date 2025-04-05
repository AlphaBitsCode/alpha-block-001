
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import RobotControlsContent from "./RobotControlsContent";
import { Position } from "@/hooks/use-draggable";

interface RobotControlDialogProps {
  isMobile: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialPosition: Position;
  onPositionChange: (position: Position) => void;
}

const RobotControlDialog: React.FC<RobotControlDialogProps> = ({ 
  isMobile,
  open,
  onOpenChange,
  initialPosition,
  onPositionChange
}) => {
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="bg-black/90 border-t border-white/20 text-white">
          <DrawerHeader>
            <DrawerTitle>Camera Position Controls</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <RobotControlsContent 
              initialPosition={initialPosition}
              onPositionChange={onPositionChange}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/90 border border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Camera Position Controls</DialogTitle>
        </DialogHeader>
        <div>
          <RobotControlsContent 
            initialPosition={initialPosition}
            onPositionChange={onPositionChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RobotControlDialog;
