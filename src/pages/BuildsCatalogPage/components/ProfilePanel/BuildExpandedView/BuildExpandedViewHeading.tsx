import { Icon } from "@/components/shared/Icon"
import { useBuildExtendedViewPortalActions } from "@/hooks/stores/useBuildExpandedViewPortalStore"

type BuildExpandedViewHeadingProps = {
  profileName: string
  buildName: string
}

export const BuildExpandedViewHeading = ({ profileName, buildName }: BuildExpandedViewHeadingProps) => {
  const { closeBuildExtendedViewPortal } = useBuildExtendedViewPortalActions();
  return (
    <div className="relative border-b border-neutral-800">
      <button
        onClick={() => closeBuildExtendedViewPortal()}
        className={`absolute top-0 right-0 hidden xl:flex items-center p-2 rounded-xl border bg-neutral-900/40 hover:bg-neutral-900/80 backdrop-blur-sm transition-all duration-200 cursor-pointer shadow-lg active:border-otz group border-neutral-800 text-neutral-400 hover:text-neutral-200`}
      >
        <Icon
          icon="Close"
          className={`size-5 transition-transform duration-200 group-hover:scale-110 text-neutral-400 group-hover:text-otz group-active:text-otz group-active:scale-110`}
        />
      </button>
      <div className="py-4">
        <h1 className="text-2xl sm:text-3xl font-bold">{`${buildName}`}</h1>
        <p className="text-sm sm:text-base text-neutral-500">{profileName}</p>
      </div>
    </div>
  )
}