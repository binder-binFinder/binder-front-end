import { useEffect, useRef, useState } from "react";

export const useDrag = (
  onDragEnd: (deltaY: number) => void,
  noUp = false,
  cardHeight?: string | number
) => {
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.TouchEvent) => {
    if (cardHeight === "100%") {
      return;
    }
    const clientY = e.touches[0].clientY;
    setStartY(clientY);
    setIsDragging(false);
  };

  useEffect(() => {
    const handleDrag = (e: TouchEvent) => {
      if (cardHeight === "100%") {
        return;
      }
      const clientY = e.touches[0].clientY;
      const deltaY = clientY - startY;

      if (Math.abs(deltaY) > 10) {
        setIsDragging(true);
      }

      if (!isDragging) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      if (ref.current) {
        if (noUp && deltaY < 0) {
          return;
        }

        setCurrentY(deltaY);
        ref.current.style.transform = `translateY(${deltaY}px)`;
      }
    };

    const handleTouchEnd = () => {
      if (ref.current) {
        ref.current.style.transform = `translateY(0)`;
        onDragEnd(currentY);
      }
      setCurrentY(0);
      setIsDragging(false);
    };

    window.addEventListener("touchmove", handleDrag, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchmove", handleDrag);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [startY, currentY, cardHeight, noUp, onDragEnd]);

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
    handleDragEnd,
  };
};
