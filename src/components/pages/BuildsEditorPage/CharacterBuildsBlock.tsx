import type { ProfileBuild, ProfileData, ProfilesData } from "@appTypes/profiles.types";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useProfileBuildsPortalActions, useProfileBuildsPortalState } from "@hooks/stores/useProfileBuildsPortalStore";
import { CharacterPortraitBlock } from "../ProfilesPage/ProfilePanel/CharacterPortraitBlock";
import { ProfileBuildsWrapper } from "../ProfilesPage/ProfilePanel/ProfileBuildsWrapper";
import { DeleteBuildButton } from "./DeleteBuildButton";
import { DecoratedHeading } from "@components/shared/DecoratedHeading";
import { EditBuildButton } from "./EditBuildButton";
import { AddBuildButton } from "./AddBuildButton";
import { BuildPanel } from "../ProfilesPage/ProfilePanel/BuildPanel";
import { Button } from "@components/shared/Button";
import { IconSVG } from "@components/shared/IconSVG";

interface Props {
  character: ProfileData;
}

const PortalContentBlock = ({ character }: Props) => {
  const queryClient = useQueryClient();
  const [builds, setBuilds] = useState<ProfileBuild[]>(character.builds ?? []);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setBuilds(character.builds ?? []);
    setHasChanges(false);
  }, [character.builds]);

  const moveBuild = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= builds.length) return;

    const newBuilds = [...builds];
    const [moved] = newBuilds.splice(index, 1);
    newBuilds.splice(targetIndex, 0, moved);
    setBuilds(newBuilds);
    setHasChanges(true);
  };

  const handleSaveOrder = async () => {
    setIsSaving(true);
    setSaveError(null);

    try {
      const res = await fetch("/api/reorder_builds.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          characterName: character.name,
          builds: builds,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setSaveError(json.error ?? "Failed to save order");
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["builds"] });
      setHasChanges(false);
    } catch {
      setSaveError("Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const saveOrderButton = hasChanges ? (
    <div className="flex flex-col items-center gap-1">
      <Button
        className="bg-otz hover:bg-otz/80 text-white font-medium py-1 px-4 rounded-md text-xs sm:text-sm transition disabled:opacity-50 flex items-center gap-1.5 shadow-md"
        onClick={handleSaveOrder}
        disabled={isSaving}
      >
        <IconSVG icon="Check" size={1} />
        {isSaving ? "Saving..." : "Save Order"}
      </Button>
      {saveError && <p className="text-xs text-red-400 mt-0.5">{saveError}</p>}
    </div>
  ) : null;

  return (
    <ProfileBuildsWrapper name={character.name} headerActions={saveOrderButton}>
      {builds.map((build, index) => {
        const leftButton = (
          <Button
            className="bg-neutral-800 hover:bg-neutral-700 p-1 rounded disabled:opacity-30 disabled:hover:bg-neutral-800 transition"
            onClick={() => moveBuild(index, "up")}
            disabled={index === 0}
            title="Move Left (Previous)"
          >
            <IconSVG icon="ArrowLeft" size={1.2} />
          </Button>
        );

        const rightButton = (
          <Button
            className="bg-neutral-800 hover:bg-neutral-700 p-1 rounded disabled:opacity-30 disabled:hover:bg-neutral-800 transition"
            onClick={() => moveBuild(index, "down")}
            disabled={index === builds.length - 1}
            title="Move Right (Next)"
          >
            <IconSVG icon="ArrowRight" size={1.2} />
          </Button>
        );

        return (
          <div key={build.name + index} className="w-full">
            <BuildPanel build={build} leftActions={leftButton} rightActions={rightButton} />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <DeleteBuildButton character={character} build={build} />
              <EditBuildButton character={character} build={build} />
            </div>
          </div>
        );
      })}

      <AddBuildButton character={character} />
    </ProfileBuildsWrapper>
  );
};

const CustomProfileHeading = ({ character }: Props) => {
  const buildsCount = character.builds?.length ?? 0

  const profileBuildsPortalState = useProfileBuildsPortalState();
  const { setProfileBuildsPortalContent, openProfileBuildsPortal } = useProfileBuildsPortalActions();

  return (
    <div className='absolute bottom-[calc(100%+10px)] w-full'>
      <DecoratedHeading text={character.name} gap={2} />
      <div className='flex gap-2 center'>
        <p className='text-center text-neutral-500 text-sm [text-decoration_underline]'>Builds: {buildsCount}</p>
        <Button className='text-center flex items-center gap-1 text-sm rounded-sm bg-otz px-2' onClick={() => {
          !profileBuildsPortalState && setProfileBuildsPortalContent((profiles: ProfilesData) => {
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
