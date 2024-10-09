import { useState } from "react";

// 배열을 반환하도록 수정
export const useToggle = (
  initialState: boolean = false
): [boolean, () => void, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return [isOpen, open, close, toggle];
};
