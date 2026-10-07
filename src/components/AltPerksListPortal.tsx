import { useAltPerksListPortalActions, useAltPerksListPortalSelectedPerk, useAltPerksListPortalState } from "@/hooks/stores/useAltPerksListPortalStore";
import { ModalPortalWrapper } from "./ModalPortalWrapper";
import { PerkBlock } from "./PerkBlock";
import { BuildExpandedViewMainPerkDetails } from "@/pages/BuildsCatalogPage/components/ProfilePanel/BuildExpandedView/BuildExpandedViewMainPerkDetails";
import { useSelectedRole } from "@/hooks/stores/useGlobalAppStore";
import { usePerkDescriptionPortalActions } from "@/hooks/stores/usePerkDescriptionPortalStore";

type AltPerksListPortalProps = {}

export const AltPerksListPortal = ({ }: AltPerksListPortalProps) => {
  const isAltPerksListPortalOpen = useAltPerksListPortalState();
  const { closeAltPerksListPortal } = useAltPerksListPortalActions();

  const { openPerkDescriptionPortal } = usePerkDescriptionPortalActions();

  const selectedRole = useSelectedRole() ?? "killers";

  const selectedPerk = useAltPerksListPortalSelectedPerk();
  if (!selectedPerk) return null

  return (
    <ModalPortalWrapper portalState={isAltPerksListPortalOpen} closePortal={closeAltPerksListPortal}>
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-8 w-screen sm:w-150">
        <h3 className="font-bold text-xl">Instead of</h3>
        <div className="flex gap-2 mb-4">
          <PerkBlock
            perkUrl={selectedPerk.iconUrl}
            className="w-15 sm:w-20"
            onClick={() => {
              openPerkDescriptionPortal(selectedPerk);
            }}
          />
          <BuildExpandedViewMainPerkDetails perk={selectedPerk} role={selectedRole} />
        </div>
        <h3 className="font-bold text-lg">You can try</h3>
        <ul className="flex flex-col gap-2 max-h-90 sm:max-h-full overflow-y-auto scrollbar-none">
          {selectedPerk.alts.map((alt) => (
            <li className="flex gap-2">
              <PerkBlock
                perkUrl={alt.iconUrl}
                className="w-15 sm:w-20"
                onClick={() => {
                  openPerkDescriptionPortal(alt)
                }}
              />
              <BuildExpandedViewMainPerkDetails perk={alt} role={selectedRole} />
            </li>
          ))}
        </ul>
      </div>
    </ModalPortalWrapper>
  )
}