
import { useState, useEffect, useRef } from 'react';

export interface Position {
  x: number;
  y: number;
}

interface UseDraggableOptions {
  initialPosition?: Position;
  bounds?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

export const useDraggable = ({ 
  initialPosition = { x: 20, y: 80 },
  bounds = {} 
}: UseDraggableOptions = {}) => {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<Position>({ x: 0, y: 0 });
  const positionStartRef = useRef<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      let newX = positionStartRef.current.x + (e.clientX - dragStartRef.current.x);
      let newY = positionStartRef.current.y + (e.clientY - dragStartRef.current.y);
      
      // Apply bounds if provided
      if (bounds.left !== undefined) newX = Math.max(bounds.left, newX);
      if (bounds.right !== undefined && dragRef.current) 
        newX = Math.min(bounds.right - dragRef.current.offsetWidth, newX);
      if (bounds.top !== undefined) newY = Math.max(bounds.top, newY);
      if (bounds.bottom !== undefined && dragRef.current)
        newY = Math.min(bounds.bottom - dragRef.current.offsetHeight, newY);
      
      setPosition({ x: newX, y: newY });
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, bounds]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement) {
      // Only allow dragging from the header/title bar
      if (e.target.closest('[data-drag-handle="true"]')) {
        setIsDragging(true);
        dragStartRef.current = { x: e.clientX, y: e.clientY };
        positionStartRef.current = { ...position };
      }
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return {
    position,
    isDragging,
    isCollapsed,
    dragRef,
    onMouseDown,
    toggleCollapse,
    setPosition
  };
};
