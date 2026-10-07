import {
  useCharacterBuildsEditorPortalSelectedProfile,
  useCharacterBuildsEditorPortalActions,
  useCharacterBuildsEditorPortalState
} from "@/hooks/stores/BuildsEditorStores/useCharacterBuildsEditorPortalStore"
import { CharacterBuildsManagerWrapper } from "../CharacterBuildsManagerWrapper";
import { DrawerPortalWrapper } from "@/components/DrawerPortalWrapper";
import { useProfiles } from "@/contexts/AppDataContext";

type CharacterBuildsManagerPortalProps = {}

export const CharacterBuildsManagerPortal = ({ }: CharacterBuildsManagerPortalProps) => {
  const profiles = useProfiles();

  const isCharacterBuildsEditorPortalOpen = useCharacterBuildsEditorPortalState();
  const { closeCharacterBuildsEditorPortal } = useCharacterBuildsEditorPortalActions();

  const selectedProfile = useCharacterBuildsEditorPortalSelectedProfile();
  if (!selectedProfile) return null

  const currentProfile = profiles[selectedProfile.role].find((profile) => profile.name === selectedProfile.name);
  if (!currentProfile) return null

  return (
    <DrawerPortalWrapper portalState={isCharacterBuildsEditorPortalOpen} closePortal={closeCharacterBuildsEditorPortal}>
      <CharacterBuildsManagerWrapper profile={currentProfile} />
    </DrawerPortalWrapper>
  )
}