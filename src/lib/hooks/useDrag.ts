import { useState } from "react";

interface UseDragProps {
  onDragEnd: () => void;
  onDragMove?: (event: CustomDragEvent) => void;
  threshold?: number;
}

type CustomDragEvent =
  | React.TouchEvent<HTMLDivElement>
  | React.MouseEvent<HTMLDivElement>;

export function useDrag({
  onDragEnd,
  onDragMove,
  threshold = 100,
}: UseDragProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  const handleDragStart = (e: CustomDragEvent) => {
    setIsDragging(true);
    if ("touches" in e) {
      setStartY(e.touches[0].clientY); // TouchEvent
    } else {
      setStartY(e.clientY); // MouseEvent
    }
  };

  const handleDragMove = (e: CustomDragEvent) => {
    if (!isDragging) return;
    let clientY: number;
    if ("touches" in e) {
      clientY = e.touches[0].clientY;
    } else {
      clientY = e.clientY;
    }
    const deltaY = clientY - startY;
    setCurrentY(deltaY);

    // onDragMove가 있으면 호출
    if (onDragMove) {
      // 드래그 이벤트의 타입을 명확히 구분
      if ("touches" in e) {
        onDragMove(e as React.TouchEvent<HTMLDivElement>);
      } else {
        onDragMove(e as React.MouseEvent<HTMLDivElement>);
      }
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (currentY > threshold) {
      onDragEnd();
    } else {
      setCurrentY(0);
    }
  };

  return {
    isDragging,
    currentY,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  };
}
