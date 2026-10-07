import { useNotificationsManagerPortalActions } from "@/hooks/stores/BuildsEditorStores/useNotificationsManagerPortalStore";
import { Icon } from "@/components/shared/Icon"

type NotificationsManagerHeadingProps = {}

export const NotificationsManagerHeading = ({ }: NotificationsManagerHeadingProps) => {
  const { closeNotificationsManagerPortal } = useNotificationsManagerPortalActions();

  return (
    <div className="flex items-center justify-between pb-2 mb-4 border-b border-neutral-800">
      <div className="flex items-center gap-2">
        <Icon icon="Bell" className="size-6 text-otz" />
        <h2 className="text-base font-bold text-white tracking-wide">
          Notifications Manager
        </h2>
      </div>
      <button
        onClick={closeNotificationsManagerPortal}
        className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
        aria-label="Close sidebar"
      >
        <Icon icon="Close" className="size-5" />
      </button>
    </div>
  )
}