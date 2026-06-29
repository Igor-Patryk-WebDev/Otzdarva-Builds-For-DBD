import type { ProfileData, ProfilesData } from "@appTypes/Profiles";

import { useProfileBuildsPortalState, useProfileBuildsPortalContent } from "@contexts/ProfileBuildsPortalContext";
import { CharacterPortraitBlock } from "../ProfilesPage/ProfilePanel/CharacterPortraitBlock";
import { DeleteBuildButton } from "./DeleteBuildButton";
import { DecoratedHeading } from "@components/shared/DecoratedHeading";
import { EditBuildButton } from "./EditBuildButton";
import { AddBuildButton } from "./AddBuildButton";
import { BuildPanel } from "../ProfilesPage/ProfilePanel/BuildPanel";
import { ProfileBuildsWrapper } from "../ProfilesPage/ProfilePanel/ProfileBuildsWrapper";
import { Button } from "@components/shared/Button";
import { IconSVG } from "@components/shared/IconSVG";

interface Props {
  character: ProfileData;
}

const PortalContentBlock = ({ character }: Props) => {
  return (
    <ProfileBuildsWrapper name={character.name}>
      {character.builds &&
        character.builds?.map((build) => (
          <div key={build.name}>
            <BuildPanel build={build} />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <DeleteBuildButton character={character} build={build} />
              <EditBuildButton character={character} build={build} />
            </div>
          </div>
        ))
      }
      <AddBuildButton character={character} />
    </ProfileBuildsWrapper>
  )
}

const CustomProfileHeading = ({ character }: Props) => {
  const buildsCount = character.builds?.length ?? 0

  const { profileBuildsPortalState, openProfileBuildsPortal } = useProfileBuildsPortalState();
  const { setProfileBuildsPortalContent } = useProfileBuildsPortalContent();

  return (
    <div className='absolute bottom-[calc(100%+10px)] w-full'>
      <DecoratedHeading text={character.name} gap={2} />
      <div className='flex gap-2 center'>
        <p className='text-center text-neutral-500 text-sm [text-decoration_underline]'>Builds: {buildsCount}</p>
        <Button className='text-center flex items-center gap-1 text-sm rounded-sm bg-otz px-2' onClick={() => {
          !profileBuildsPortalState && setProfileBuildsPortalContent(() => (profiles: ProfilesData) => {
            const latestCharacter = profiles[character.role].find((c) => c.name === character.name) ?? character;
            return <PortalContentBlock character={latestCharacter} />;
          });
          !profileBuildsPortalState && openProfileBuildsPortal();
        }}>
          SHOW
          <IconSVG icon="Menu" size={1} />
        </Button>
      </div>
    </div>
  )
}

export function CharacterBuildsBlock({ character }: Props) {
  return (
    <div className="relative w-50">
      <CustomProfileHeading character={character} />
      <CharacterPortraitBlock name={character.name} portraitUrl={character.portraitUrl} role={character.role} />
    </div>
  );
}
