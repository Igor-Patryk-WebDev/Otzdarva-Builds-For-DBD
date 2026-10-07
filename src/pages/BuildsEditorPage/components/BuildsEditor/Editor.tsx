// import type { ProfileData } from "@/types/profiles.types"
// import type { Build } from "@/types/builds.types"
import { useBuildsEditorPortalActions, useBuildsEditorPortalSelectedBuild, useBuildsEditorPortalSelectedProfile } from "@/hooks/stores/BuildsEditorStores/useBuildsEditorPortalStore"
import { BuildsEditorHeading } from "./BuildsEditorHeading"
import { BuildsEditorNameInput } from "./BuildsEditorNameInput"
// import { BuildsEditorPerkSlot } from "./BuildsEditorPerkSlot"
import { Icon } from "@/components/shared/Icon"
import { PerkBlock } from "@/components/PerkBlock"
import { useScrape } from "@/contexts/AppDataContext"


export const Editor = () => {
  const scrape = useScrape();
  const { closeBuildsEditorPortal } = useBuildsEditorPortalActions();

  const selectedProfile = useBuildsEditorPortalSelectedProfile();
  const selectedBuild = useBuildsEditorPortalSelectedBuild();

  if (!selectedProfile) return null;

  const { name: characterName } = selectedProfile;
  const { name: buildName } = selectedBuild ?? {};

  return (
    <form className='relative w-full max-w-400 max-h-full p-4 bg-neutral-900 border border-neutral-800 rounded-xl'
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <button
        className="absolute top-4 right-4 bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-800 p-2 backdrop-blur-sm rounded-xl shadow-lg active:border-otz transition cursor-pointer group"
        onClick={() => closeBuildsEditorPortal()}
        title="Move Left (Previous)"
      >
        <Icon icon="Close" className="size-5 text-neutral-400 group-hover:text-otz" />
      </button>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <BuildsEditorHeading name={characterName} />
          <BuildsEditorNameInput name={buildName} />
          <div className="flex flex-col gap-1">
            <label className="text-xs text-neutral-400 uppercase tracking-widest pl-1">
              Perk Slots
            </label>
            <div className="grid grid-rows-4 bg-neutral-800 rounded-lg p-4 border border-white/10">
              {[0, 1, 2, 3].map((index) => (
                <div className="grid grid-cols-[auto_1fr] gap-4">
                  <PerkBlock key={`perk-slot-${index}`} perkUrl="/images/no_perk.png" />
                  <div>
                    <p className="font-bold text-neutral-500">Bloodweb</p>
                    <h3 className="text-xl font-bold">Sloppy Butcher</h3>
                  </div>
                </div>
              ))}
            </div>
            {/* <AltsPanel /> */}
          </div>
          <div>
            <label className="text-xs text-neutral-400 uppercase tracking-widest pl-1">
              Notes
            </label>
            <div className="flex flex-col gap-2 bg-neutral-800 rounded-lg p-4 border border-white/10">
              <textarea>
                TEST
              </textarea>
              <textarea>
                TEST
              </textarea>
              <textarea>
                TEST
              </textarea>
              <textarea>
                TEST
              </textarea>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 bg-neutral-800 rounded-lg border border-white/10 overflow-hidden">
          <div className="flex flex-col gap-2 p-4 border-b border-white/10">
            <h2 className="font-bold text-lg text-white">
              Perk Browser
            </h2>
            <p className="text-xs text-neutral-500">
              Select a perk slot to start adding perks.
            </p>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search perks"
                className="w-full bg-neutral-700 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-otz text-sm"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-5 gap-2">
              {scrape.killers.perks.map((perk) => {
                return (
                  <div
                    key={perk.name}
                    className={`cursor-pointer transition`}
                  >
                    <img
                      src={perk.iconUrl}
                      alt={perk.name}
                      className={`w-full aspect-square object-cover rounded-lg transition
                        ? "hover:ring-1 hover:ring-otz hover:bg-neutral-700"
                        : ""
                        }`}
                    />
                    <p className="text-center text-xs text-neutral-400 truncate mt-1">
                      {perk.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}