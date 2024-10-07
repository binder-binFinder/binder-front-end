import { useRef, useState } from "react";

export const useDrag = (
  onDragEnd: (deltaY: number) => void,
  noUp = false,
  cardHeight?: string | number
) => {
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (cardHeight === "100%") {
      return;
    }
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setStartY(clientY);
  };

  const handleDrag = (e: React.TouchEvent | React.MouseEvent) => {
    if (cardHeight === "100%") {
      return;
    }
    if (ref.current) {
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const deltaY = clientY - startY;

      if (noUp && deltaY < 0) {
        return;
      }

      setCurrentY(deltaY);
      ref.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleDragEnd = () => {
    if (ref.current) {
      ref.current.style.transform = `translateY(0)`;
    }
    onDragEnd(currentY);
    setCurrentY(0);
  };

  return {
    ref,
    handleDragStart,
    handleDrag,
    handleDragEnd,
  };
};
