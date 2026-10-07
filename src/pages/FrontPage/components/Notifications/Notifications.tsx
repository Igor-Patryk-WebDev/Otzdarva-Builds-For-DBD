import { useEffect, useRef, useState } from "react";
import { NotificationsToggleButton } from "./NotificationsToggleButton";
import { NotificationsModal } from "./NotificationsModal";
import { useAnnouncementsJSON } from "@/hooks/queries/useAnnouncementsJSON";

type NotificationsProps = {}

export const Notifications = ({ }: NotificationsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data } = useAnnouncementsJSON();

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

  const notificationsCount = data?.alerts.length ?? 0

  return (
    <div ref={containerRef} className="z-1">
      {notificationsCount > 0 &&
        <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 z-1 pointer-events-none rounded-full aspect-square bg-otz size-4 flex justify-center items-center">
          <p className="text-xs">{notificationsCount}</p>
        </div>
      }
      <NotificationsModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <NotificationsToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}