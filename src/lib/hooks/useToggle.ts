import { useState } from "react";

// 배열을 반환하도록 수정
export const useToggle = (initialState: boolean = false): [boolean, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return [isOpen, open, close];
};
