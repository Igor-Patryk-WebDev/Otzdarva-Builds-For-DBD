import type { Dispatch, SetStateAction } from "react"
import { Icon } from "@/components/shared/Icon"

type NotificationsToggleButtonProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const NotificationsToggleButton = ({ isOpen, setIsOpen }: NotificationsToggleButtonProps) => {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`flex items-center p-2 rounded-xl border bg-neutral-900/40 hover:bg-neutral-900/80 backdrop-blur-sm transition-all duration-200 cursor-pointer shadow-lg group ${isOpen
        ? "border-otz text-neutral-100"
        : "border-neutral-800 text-neutral-400 hover:text-neutral-200"
        }`}
    >
      <div className={`grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-[grid-template-columns] group-hover:px-2 ${isOpen
        && "grid-cols-[1fr] px-2"
        }`}>
        <div className="overflow-hidden">
          <span className="text-xs font-medium block text-nowrap">Announcements</span>
        </div>
      </div>
      <Icon
        icon="Bell"
        className={`size-5 transition-transform duration-200 group-hover:scale-110 ${isOpen ? "text-otz" : "text-neutral-400 group-hover:text-otz"}`}
      />
    </button>
  )
}