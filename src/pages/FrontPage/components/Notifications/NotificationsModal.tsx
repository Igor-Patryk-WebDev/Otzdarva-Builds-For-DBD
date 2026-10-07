import type { Dispatch, SetStateAction } from "react"

import { useAnnouncementsJSON } from "@/hooks/queries/useAnnouncementsJSON"
import { NotificationPanel } from "@/components/NotificationPanel"
import { Icon } from "@/components/shared/Icon"

type NotificationsModalProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const NotificationsModal = ({ isOpen, setIsOpen }: NotificationsModalProps) => {
  const { data, error, isPending } = useAnnouncementsJSON();

  return (
    <div
      className={`absolute top-12 right-0 mb-2 w-[calc(100vw-32px)] sm:w-120 rounded-xl bg-neutral-900 border border-neutral-800 p-4 shadow-2xl backdrop-blur-md flex flex-col gap-3 transition-all duration-200 ease-out origin-bottom-right ${isOpen
        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
        : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
        }`}
    >
      <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
        <div className="flex items-center gap-2">
          <Icon icon="Bell" className="size-5 text-otz" />
          <span className="font-bold text-sm text-neutral-100">
            Announcements
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
        >
          <Icon icon="Close" className="size-5" />
        </button>
      </div>

      {isPending
        ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-2 border-l-4 rounded-lg border-neutral-800 border-l-neutral-700 px-4 py-2 animate-pulse">
                <div className="h-3 bg-neutral-700 rounded w-3/4 mb-2" />
                <div className="h-2 bg-neutral-800 rounded w-full mb-1" />
                <div className="h-2 bg-neutral-800 rounded w-2/3" />
              </div>
            ))}
          </div>
        )
        : error
          ? (
            <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              <Icon icon="Close" className="size-4" />
              <span>Failed to load announcements.</span>
            </div>
          )
          : (
            <div className="flex flex-col gap-3 overflow-y-auto max-h-110 sm:max-h-130 scrollbar-none">
              {data?.alerts.length === 0 &&
                <p className="text-xs text-neutral-400 leading-relaxed">
                  No announcements yet... sorry!
                </p>
              }
              {data?.alerts.map((alert) => (
                <NotificationPanel alert={alert} />
              ))}
            </div>
          )
      }
    </div>
  )
}