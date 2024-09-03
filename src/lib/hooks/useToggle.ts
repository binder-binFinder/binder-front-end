import { useState } from "react";

export function useToggle(): { isToggle: boolean; handleToggleClick: () => void } {
  const [isToggle, setIsToggle] = useState<boolean>(false);

  const handleToggleClick = () => {
    setIsToggle((prev) => !prev);
  };

  return { isToggle, handleToggleClick };
}
