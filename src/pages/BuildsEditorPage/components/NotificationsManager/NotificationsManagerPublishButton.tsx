import { Icon } from "@/components/shared/Icon"

type NotificationsManagerPublishButtonProps = {
  title: string
  desc: string
  isSubmitting: boolean
  addAlert: () => void
}

export const NotificationsManagerPublishButton = ({ title, desc, isSubmitting, addAlert }: NotificationsManagerPublishButtonProps) => {
  return (
    <div className="pt-2">
      <button
        onClick={addAlert}
        disabled={!title.trim() || !desc.trim() || isSubmitting}
        className={`w-full flex items-center justify-center p-2 rounded-xl border border-otz disabled:border-neutral-800 bg-linear-90 from-otz/70 to-neutral-900/40 disabled:from-neutral-950/40 disabled:to-neutral-950/40 hover:bg-otz/80 disabled:bg-neutral-950/40 active:bg-otz/80 backdrop-blur-sm transition-all duration-200 text-neutral-200 disabled:text-neutral-600 cursor-pointer disabled:cursor-not-allowed shadow-lg group`}
      >
        <div className={`grid transition-[grid-template-columns] grid-cols-[1fr] px-2`}>
          <span className="text-xs font-medium block text-nowrap">
            {isSubmitting ? "Publishing..." : "Publish Notification"}
          </span>
        </div>
        <Icon
          icon="Plus"
          className={`size-5 transition-transform duration-200 group-hover:scale-110 group-disabled:group-hover:scale-100 text-neutral-200 group-disabled:text-neutral-600`}
        />
      </button>
    </div>
  )
}