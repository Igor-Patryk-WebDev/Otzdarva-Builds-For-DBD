import type { ProfileData } from "@appTypes/Profiles";

import { useBuildsPortalContent, useBuildsPortalState, useOpenBuildsPortal } from "@contexts/BuildsPortalContext";
import { CharacterPortraitBlock } from "../ProfilesPage/ProfilePanel/CharacterPortraitBlock";
import { DeleteBuildButton } from "./DeleteBuildButton";
import { DecoratedHeading } from "@components/shared/DecoratedHeading";
import { EditBuildButton } from "./EditBuildButton";
import { AddBuildButton } from "./AddBuildButton";
import { BuildPanel } from "../ProfilesPage/ProfilePanel/BuildPanel";
import { BuildsList } from "../ProfilesPage/ProfilePanel/BuildsList";
import { Button } from "@components/shared/Button";

interface Props {
  character: ProfileData;
}

const PortalContentBlock = ({ character }: Props) => {
  return (
    <BuildsList name={character.name}>
      {character.builds &&
        character.builds?.map((build) => (
          <div>
            <BuildPanel build={build} />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <DeleteBuildButton character={character} build={build} />
              <EditBuildButton character={character} build={build} />
            </div>
          </div>
        ))
      }
      <AddBuildButton character={character} />
    </BuildsList>
  )
}

const CustomProfileHeading = ({ character }: Props) => {
  const buildsCount = character.builds?.length ?? 0

  const buildsPortalState = useBuildsPortalState();
  const openBuildsPortal = useOpenBuildsPortal();
  const { setBuildsPortalContent } = useBuildsPortalContent();

  return (
    <div className='absolute bottom-[calc(100%+10px)] w-full'>
      <DecoratedHeading text={character.name} gap={2} />
      <div className='flex gap-2 center'>
        <p className='text-center text-neutral-500 text-sm [text-decoration_underline]'>Builds: {buildsCount}</p>
        <Button className='text-center text-sm rounded-sm bg-otz px-2' onClick={() => {
          !buildsPortalState && setBuildsPortalContent(<PortalContentBlock character={character} />);
          !buildsPortalState && openBuildsPortal();
        }}>
          SHOW
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
