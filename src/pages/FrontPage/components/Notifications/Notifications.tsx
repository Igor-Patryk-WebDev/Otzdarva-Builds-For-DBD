import { useEffect, useRef, useState } from "react";
import { NotificationsToggleButton } from "./NotificationsToggleButton";
import { NotificationsModal } from "./NotificationsModal";

type NotificationsProps = {}

export const Notifications = ({ }: NotificationsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) setIsOpen(false);
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="z-1">
      <NotificationsModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <NotificationsToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}