import type { ProfileBuild, ProfileData } from "@/types/profiles.types"
import { useBuildsEditorPortalActions } from "@/hooks/stores/BuildsEditorStores/useBuildsEditorPortalStore"
import { useEffect, useRef, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { BuildPanel } from "@/components/BuildPanel"
import { Icon } from "@/components/shared/Icon"

type EditableBuildPanelProps = {
  profile: ProfileData
  build: ProfileBuild
  index: number
  buildsCount: number
  moveNext: (index: number) => void
  movePrevious: (index: number) => void
}

export const EditableBuildPanel = ({ profile, build, index, buildsCount, moveNext, movePrevious }: EditableBuildPanelProps) => {
  const queryClient = useQueryClient();
  const { openBuildsEditorPortal } = useBuildsEditorPortalActions();

  const [clicked, setClicked] = useState(false);
  // const [isDeleting, setIsDeleting] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) setClicked(false);
    };

    if (clicked) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [clicked])

  const handleDelete = async () => {
    // setIsDeleting(true);
    // setError(null);

    try {
      const res = await fetch("/api/delete_build.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          characterName: profile.name,
          buildName: build.name,
        }),
      });

      // const json = await res.json();

      if (!res.ok) {
        // setError(json.error ?? "Delete failed.");
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["builds"] });
    } catch {
      // setError("Network error. Please try again.");
    } finally {
      // setIsDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <button
          className="bg-neutral-900/40 hover:bg-neutral-900/80 disabled:hover:bg-neutral-900/40 border border-neutral-800 p-2 backdrop-blur-sm rounded-xl disabled:opacity-30 shadow-lg active:border-otz disabled:active:border-neutral-800 transition cursor-pointer disabled:cursor-default group"
          onClick={() => movePrevious(index)}
          disabled={index === 0}
          title="Move Left (Previous)"
        >
          <Icon icon="ArrowLeft" className="size-5 text-neutral-400 group-hover:text-otz group-disabled:group-hover:text-neutral-400" />
        </button>

        <div className="flex gap-2">
          <button
            className="flex items-center bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-800 p-2 backdrop-blur-sm rounded-xl disabled:opacity-30 shadow-lg active:border-otz disabled:hover:bg-neutral-800 transition cursor-pointer group"
            onClick={() => openBuildsEditorPortal({ build, profile })}
            title="Edit Button"
          >
            <div className={`grid grid-cols-1 px-2`}>
              <span className="text-xs font-medium block text-nowrap">Edit</span>
            </div>
            <Icon icon="Edit" className="size-5 transition-transform duration-200 group-hover:scale-110 text-neutral-400 group-hover:text-otz" />
          </button>
          <button
            ref={containerRef}
            className="flex items-center bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-800 p-2 backdrop-blur-sm rounded-xl disabled:opacity-30 shadow-lg active:border-otz disabled:hover:bg-neutral-800 transition cursor-pointer group"
            onClick={() => {
              clicked ? handleDelete() : setClicked(true);
            }}
            title="Delete Button"
          >
            <div className={`grid grid-cols-1 px-2`}>
              <span className="text-xs font-medium block text-nowrap">{!clicked ? "Delete" : "Are you sure?"}</span>
            </div>
            <Icon icon="Delete" className="size-5 transition-transform duration-200 group-hover:scale-110 text-neutral-400 group-hover:text-otz" />
          </button>
        </div>

        <button
          className="bg-neutral-900/40 hover:bg-neutral-900/80 disabled:hover:bg-neutral-900/40 border border-neutral-800 p-2 backdrop-blur-sm rounded-xl disabled:opacity-30 shadow-lg active:border-otz disabled:active:border-neutral-800 transition cursor-pointer disabled:cursor-default group"
          onClick={() => moveNext(index)}
          disabled={index === (buildsCount - 1)}
          title="Move Right (Next)"
        >
          <Icon icon="ArrowRight" className="size-5 text-neutral-400 group-hover:text-otz group-disabled:group-hover:text-neutral-400" />
        </button>
      </div>
      <BuildPanel profile={profile} build={build} />
    </div>
  )
}