import type { ProfileBuild, ProfileData } from "@/types/profiles.types"

import { useCharacterBuildsEditorPortalActions } from "@/hooks/stores/BuildsEditorStores/useCharacterBuildsEditorPortalStore"
import { EditableBuildPanel } from "./EditableBuildPanel"
import { AddBuildButton } from "./AddBuildButton"
import { useQueryClient } from "@tanstack/react-query"
import { useHotkey } from "@tanstack/react-hotkeys"
import { useState } from "react"
import { Icon } from "@/components/shared/Icon"

type CharacterBuildsManagerWrapperProps = {
  profile: ProfileData
  filteredBuilds?: ProfileBuild[]
}

export const CharacterBuildsManagerWrapper = ({ profile, filteredBuilds }: CharacterBuildsManagerWrapperProps) => {
  const queryClient = useQueryClient();
  const { closeCharacterBuildsEditorPortal } = useCharacterBuildsEditorPortalActions();

  const [localBuilds, setLocalBuilds] = useState<ProfileBuild[] | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useHotkey("Escape", () => closeCharacterBuildsEditorPortal());

  const buildsCount = profile.builds?.length ?? 0

  const originalBuilds = profile.builds ?? []
  const builds = filteredBuilds ?? localBuilds ?? originalBuilds

  function reorderArray<T>(list: T[], fromIndex: number, toIndex: number): T[] {
    if (
      fromIndex < 0 ||
      fromIndex >= list.length ||
      toIndex < 0 ||
      toIndex >= list.length ||
      fromIndex === toIndex
    ) {
      return list;
    }
    const result = [...list];
    const [removed] = result.splice(fromIndex, 1);
    result.splice(toIndex, 0, removed);
    return result;
  }

  const hasChanges = () => {
    if (!localBuilds) return false;
    if (localBuilds.length !== originalBuilds.length) return true;
    return localBuilds.some((build, index) => build.name !== originalBuilds[index]?.name);
  }

  const moveBuild = (fromIndex: number, toIndex: number) => {
    setLocalBuilds((current) =>
      reorderArray(current ?? originalBuilds, fromIndex, toIndex))
  }

  const moveNext = (index: number) => {
    moveBuild(index, index + 1);
  }

  const movePrevious = (index: number) => {
    moveBuild(index, index - 1);
  }

  const saveOrder = async () => {
    if (!hasChanges()) return true

    setSaveError(null);

    try {
      const response = await fetch("/api/reorder_builds.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          characterName: profile.name,
          builds,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMsg = data?.error ?? "Failed to save order.";
        setSaveError(errorMsg);
        return false;
      }

      setLocalBuilds(null);
      await queryClient.invalidateQueries({ queryKey: ["builds"] });

      return true;
    } catch {
      const errorMsg = "Network error. Please try again.";
      setSaveError(errorMsg);
      return false;
    }
  }

  return (
    <div className="relative px-8 sm:px-16 pt-8">
      <button className='absolute top-4 right-4 bg-otz hover:bg-[hsl(from_var(--color-otz)_h_s_40%)] size-6 sm:size-8 rounded-sm flex items-center justify-center cursor-pointer'
        onClick={() => closeCharacterBuildsEditorPortal()}>
        <Icon icon="Close" className="size-5" />
      </button>
      <div className="relative py-4 border-b border-neutral-800">
        <div>
          <h2 className="text-3xl font-bold">{profile.name}</h2>
          <p className="text-neutral-400">Builds: {buildsCount}</p>
        </div>
        {hasChanges() &&
          <div className="absolute bottom-4 right-0">
            <div className="flex gap-2">
              <button
                className={`bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-800 py-2.5 px-4 backdrop-blur-sm rounded-xl disabled:opacity-30 shadow-lg active:border-otz disabled:hover:bg-neutral-800 transition cursor-pointer group`}
                onClick={() => {
                  setLocalBuilds(null);
                }}
              >
                <span className="text-xs font-medium block text-nowrap">Reset</span>
              </button>
              <button
                className={`flex items-center p-2 rounded-xl border border-otz bg-linear-90 from-otz/70 to-neutral-900/40 hover:bg-otz/80 active:bg-otz/80 backdrop-blur-sm transition-all duration-200 text-neutral-200 cursor-pointer shadow-lg group`}
                onClick={() => {
                  saveOrder();
                }}
              >
                <div className={`grid transition-[grid-template-columns] grid-cols-[1fr] px-2`}>
                  <span className="text-xs font-medium block text-nowrap">Save order</span>
                </div>
                <Icon
                  icon="Confirm"
                  className={`size-5 transition-transform duration-200 group-hover:scale-110 text-neutral-100`}
                />
              </button>
            </div>
            {saveError &&
              <p>{saveError}</p>
            }
          </div>}
      </div>
      <div className='max-h-180 transition-all overflow-y-auto scrollbar-none scrollbar-thumb-otz mt-6 pb-48'>
        <div className='grid grid-cols-[minmax(0,466px)] lg:grid-cols-[repeat(2,minmax(0,466px))] 2xl:grid-cols-[repeat(3,minmax(0,466px))] justify-center gap-10 mx-auto'>
          {builds.map((build, index) => {
            return (
              <EditableBuildPanel
                profile={profile}
                build={build}
                index={index}
                buildsCount={buildsCount}
                moveNext={moveNext}
                movePrevious={movePrevious}
              />
            )
          })}
          <AddBuildButton character={profile} />
        </div>
      </div>
    </div>
  )
}