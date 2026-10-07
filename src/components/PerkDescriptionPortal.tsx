import { usePerkDescriptionPortalActions, usePerkDescriptionPortalSelectedPerk, usePerkDescriptionPortalState } from "@/hooks/stores/usePerkDescriptionPortalStore";
import { BuildExpandedViewMainPerkDetails } from "@/pages/BuildsCatalogPage/components/ProfilePanel/BuildExpandedView/BuildExpandedViewMainPerkDetails";
import { ModalPortalWrapper } from "./ModalPortalWrapper"
import { useSelectedRole } from "@/hooks/stores/useGlobalAppStore";
import { PerkBlock } from "./PerkBlock";

type PerkDescriptionPortalProps = {}

export const PerkDescriptionPortal = ({ }: PerkDescriptionPortalProps) => {
  const isPerkDescriptionPortalOpen = usePerkDescriptionPortalState();
  const { closePerkDescriptionPortal } = usePerkDescriptionPortalActions();

  const selectedRole = useSelectedRole() ?? "killers";

  const selectedPerk = usePerkDescriptionPortalSelectedPerk();
  if (!selectedPerk) return null

  return (
    <ModalPortalWrapper portalState={isPerkDescriptionPortalOpen} closePortal={closePerkDescriptionPortal}>
      <div
        className={`w-screen sm:w-180 overflow-clip bg-neutral-900 border border-neutral-800 rounded-2xl`}
      >
        <div className="bg-black">
          <div className='relative overflow-clip px-4 sm:px-8 py-2 isolate'>
            <img src="/images/CharPortrait_roleBG.webp" alt="" className={`absolute top-1/2 left-0 right-0 -translate-y-1/4 scale-160 ${selectedRole === "killers" ? "killers-filter" : "survivors-filter"} -z-1`} />
            <div className="flex gap-2">
              <PerkBlock perkUrl={selectedPerk.iconUrl} className="w-15 sm:w-20" />
              <BuildExpandedViewMainPerkDetails perk={selectedPerk} role={selectedRole} />
            </div>
          </div>
        </div>
        <div
          className="py-4 px-4 sm:px-8 text-xs sm:text-sm"
          dangerouslySetInnerHTML={{ __html: selectedPerk.description ?? "" }}
        />
      </div>
    </ModalPortalWrapper >
  )
}