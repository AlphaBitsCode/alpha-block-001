
import React from "react";
import { Position } from "@/hooks/use-draggable";

interface MiniMapProps {
  position: Position;
  visible?: boolean;
}

const MiniMap: React.FC<MiniMapProps> = ({ position, visible = true }) => {
  // This component is no longer used as the minimap functionality
  // has been integrated directly into the Dashboard.tsx
  return null;
};

export default MiniMap;
