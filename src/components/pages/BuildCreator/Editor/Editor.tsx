import type { ProfileData } from "@appTypes/Profiles";
import type { Build } from "@appTypes/Builds";
import type { Perk } from "@appTypes/Scrape";

import { type ComponentPropsWithoutRef, useState } from "react";
import { useCloseEditorPortal } from "@contexts/EditorPortalContext";
import { useScrape } from "@contexts/AppDataContext";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@components/shared/Button";
import {
  EditorProvider,
  useEditorAlts,
  useEditorBuildName,
  useEditorError,
  useEditorNotes,
  useEditorPerkBrowser,
  useEditorSlots,
} from "@contexts/EditorContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EditorProps {
  character: ProfileData;
  build?: Build;
}

// ─── Small shared primitives ──────────────────────────────────────────────────

const CloseButton = ({ ...rest }: ComponentPropsWithoutRef<"button">) => (
  <Button className="absolute top-4 right-4 size-8 bg-otz rounded-md" {...rest}>
    X
  </Button>
);

const EditorHeading = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center bg-neutral-800 rounded-lg p-4 border border-white/10">
    <h2 className="font-bold text-3xl text-white text-center">{name}</h2>
  </div>
);

// ─── BuildNameBlock ───────────────────────────────────────────────────────────

const BuildNameBlock = () => {
  const { buildName, setBuildName } = useEditorBuildName();

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-neutral-400 uppercase tracking-widest pl-1">
        Build Name
      </label>
      <input
        className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-otz resize-none"
        type="text"
        value={buildName}
        placeholder="Enter build name..."
        onChange={(e) => setBuildName(e.target.value)}
      />
    </div>
  );
};

// ─── PerkSlot ─────────────────────────────────────────────────────────────────

interface PerkSlotProps {
  index: number;
}

const PerkSlot = ({ index }: PerkSlotProps) => {
  const { perkSlots, setPerkSlots, selectedSlot, setSelectedSlot } =
    useEditorSlots();
  const { alts, altPanelSlot, setAltPanelSlot } = useEditorAlts();

  const perk = perkSlots[index];
  const isAltPanel = altPanelSlot === index;
  const isSelected = selectedSlot === index;

  const handleSlotClick = () => {
    setSelectedSlot((prev) => (prev === index ? null : index));
    // Close alt panel when switching slots
    setAltPanelSlot(null);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPerkSlots((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
    setSelectedSlot(null);
    setAltPanelSlot(null);
  };

  const handleToggleAltPanel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAltPanelSlot((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex-1 flex flex-col gap-1">
      <button
        onClick={handleSlotClick}
        className={`aspect-square relative w-full ${
          isAltPanel
            ? "ring-2 ring-blue-500 rounded-lg"
            : isSelected
              ? "ring-2 ring-otz bg-neutral-600 transition-colors rounded-lg"
              : "border-neutral-600 hover:border-neutral-400"
        }`}
      >
        {perk ? (
          <>
            <img
              src={perk.iconUrl}
              alt={perk.name}
              className="w-full h-full object-cover rounded-lg cursor-pointer hover:bg-neutral-700 hover:ring-1 hover:ring-otz transition"
            />
            {alts[index].length > 0 && (
              <span className="absolute bottom-0 left-0 bg-blue-500 text-white text-xs rounded-bl-lg px-1">
                {alts[index].length}
              </span>
            )}
            <Button
              onClick={handleDelete}
              className="absolute top-0 right-0 w-5 h-5 bg-otz flex items-center justify-center text-xs rounded-tr-lg aspect-square shrink-0"
            >
              ×
            </Button>
          </>
        ) : (
          <img
            src="/images/no_perk.png"
            alt="empty slot"
            className="relative w-full h-full object-cover rounded-lg cursor-pointer hover:bg-neutral-700 hover:ring-1 hover:ring-otz transition"
          />
        )}
      </button>

      {/* Alt toggle button — only when this slot is selected and has a perk */}
      {isSelected && perk && (
        <button
          onClick={handleToggleAltPanel}
          className={`w-full text-xs rounded-md py-0.5 transition ${
            isAltPanel
              ? "bg-blue-600 text-white"
              : "bg-neutral-700 text-neutral-300 hover:bg-blue-600/60 hover:text-white"
          }`}
        >
          {isAltPanel ? "← Back" : "+ Alts"}
        </button>
      )}
    </div>
  );
};

// ─── AltsPanel ────────────────────────────────────────────────────────────────

const AltsPanel = () => {
  const { perkSlots } = useEditorSlots();
  const { alts, setAlts, altPanelSlot } = useEditorAlts();

  if (altPanelSlot === null || !perkSlots[altPanelSlot]) return null;

  const handleAltDelete = (altIndex: number) => {
    setAlts((prev) => {
      const updated = prev.map((row) => [...row]);
      updated[altPanelSlot].splice(altIndex, 1);
      return updated;
    });
  };

  return (
    <div className="flex flex-col gap-2 bg-neutral-800 rounded-lg p-4 border border-blue-500/50">
      <p className="text-xs text-blue-400 uppercase tracking-widest">
        Alts for{" "}
        <span className="text-white">{perkSlots[altPanelSlot]?.name}</span> —
        pick from browser
      </p>
      <div className="flex flex-wrap gap-2">
        {alts[altPanelSlot].length === 0 && (
          <p className="text-neutral-500 text-sm">No alts yet</p>
        )}
        {alts[altPanelSlot].map((alt, j) => (
          <div key={alt.name + j} className="relative">
            <img
              src={alt.iconUrl}
              alt={alt.name}
              className="h-12 w-12 object-cover rounded-lg"
            />
            <button
              onClick={() => handleAltDelete(j)}
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── PerkSlotsBlock ───────────────────────────────────────────────────────────

const PerkSlotsBlock = () => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-neutral-400 uppercase tracking-widest pl-1">
      Perk Slots
    </label>
    <div className="flex gap-3 bg-neutral-800 rounded-lg p-4 border border-white/10">
      {[0, 1, 2, 3].map((i) => (
        <PerkSlot key={i} index={i} />
      ))}
    </div>
    <AltsPanel />
  </div>
);

const NotesBlock = () => {
  const { notes, setNotes, notesCount, setNotesCount } = useEditorNotes();

  const handleAddNote = () => setNotesCount((prev) => Math.min(prev + 1, 8));
  const handleRemoveNote = () => setNotesCount((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-1">
        <label className="text-xs text-neutral-400 uppercase tracking-widest">
          Notes
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRemoveNote}
            disabled={notesCount <= 1}
            className="w-6 h-6 flex items-center justify-center bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed rounded text-white font-bold"
          >
            -
          </button>
          <span className="text-xs text-neutral-400 min-w-4 text-center">
            {notesCount}
          </span>
          <button
            onClick={handleAddNote}
            disabled={notesCount >= 8}
            className="w-6 h-6 flex items-center justify-center bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed rounded text-white font-bold"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 bg-neutral-800 rounded-lg p-4 border border-white/10">
        {Array.from({ length: notesCount }, (_, i) => (
          <textarea
            key={i}
            value={notes[i] ?? ""}
            placeholder={`Note ${i + 1}`}
            rows={2}
            onChange={(e) =>
              setNotes((prev) => {
                const updated = [...prev];
                updated[i] = e.target.value;
                return updated;
              })
            }
            className="w-full bg-neutral-700 border border-white/10 rounded-md px-3 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-otz resize-none text-sm"
          />
        ))}
      </div>
    </div>
  );
};

// ─── PerkBrowserBlock ─────────────────────────────────────────────────────────

interface PerkBrowserBlockProps {
  perks: Perk[];
}

const PerkBrowserBlock = ({ perks }: PerkBrowserBlockProps) => {
  const { perkQuery, setPerkQuery } = useEditorPerkBrowser();
  const { selectedSlot, setPerkSlots, perkSlots } = useEditorSlots();
  const { altPanelSlot, setAlts, alts } = useEditorAlts();

  const filtered = perks.filter((perk) =>
    perk.name.toLowerCase().includes(perkQuery.toLowerCase()),
  );

  // Names already used as alts for the currently active alt panel slot
  const usedAltNamesForSlot =
    altPanelSlot !== null
      ? new Set(alts[altPanelSlot].map((a) => a.name))
      : new Set<string>();

  const isBlocked = (perk: Perk): boolean => {
    if (altPanelSlot !== null) {
      // In alt mode: block if already an alt for this slot, or if it's the main perk of this slot
      return (
        usedAltNamesForSlot.has(perk.name) ||
        perkSlots[altPanelSlot]?.name === perk.name
      );
    }
    // In main mode: block if already used in any slot (other than the currently selected one)
    return perkSlots.some(
      (p, i) => p?.name === perk.name && i !== selectedSlot,
    );
  };

  const handlePerkSelect = (perk: Perk) => {
    if (isBlocked(perk)) return;

    if (altPanelSlot !== null) {
      setAlts((prev) => {
        const updated = prev.map((row) => [...row]);
        updated[altPanelSlot] = [...updated[altPanelSlot], perk];
        return updated;
      });
      return;
    }

    if (selectedSlot === null) return;

    setPerkSlots((prev) => {
      const updated = [...prev];
      updated[selectedSlot] = perk as unknown as (typeof prev)[number];
      return updated;
    });
  };

  const isInAltMode = altPanelSlot !== null;
  const canSelect = isInAltMode || selectedSlot !== null;

  return (
    <div className="flex flex-col flex-1 bg-neutral-800 rounded-lg border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-2 p-4 border-b border-white/10">
        <h2 className="font-bold text-lg text-white">
          {isInAltMode
            ? `Adding alts for ${perkSlots[altPanelSlot]?.name}`
            : "Perk Browser"}
        </h2>
        {!canSelect && (
          <p className="text-xs text-neutral-500">
            Select a perk slot to start adding perks.
          </p>
        )}
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
            value={perkQuery}
            onChange={(e) => setPerkQuery(e.target.value)}
            placeholder="Search perks"
            className="w-full bg-neutral-700 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-otz text-sm"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-5 gap-2">
          {filtered.map((perk) => {
            const blocked = isBlocked(perk);
            return (
              <div
                key={perk.name}
                onClick={() => handlePerkSelect(perk)}
                title={blocked ? "Already used" : perk.name}
                className={`cursor-pointer transition ${
                  blocked
                    ? "opacity-30 cursor-not-allowed"
                    : canSelect
                      ? "hover:scale-105"
                      : "opacity-50 cursor-not-allowed"
                }`}
              >
                <img
                  src={perk.iconUrl}
                  alt={perk.name}
                  className={`w-full aspect-square object-cover rounded-lg transition ${
                    !blocked && canSelect
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
  );
};

// ─── EditorInner ──────────────────────────────────────────────────────────────
// Separate inner component so hooks can access the context provided by EditorProvider above.

interface EditorInnerProps {
  character: ProfileData;
  build?: Build;
}

const EditorInner = ({ character, build }: EditorInnerProps) => {
  const closeEditorPortal = useCloseEditorPortal();
  const { error, setError } = useEditorError();
  const scrape = useScrape();
  const queryClient = useQueryClient();

  const { buildName } = useEditorBuildName();
  const { perkSlots } = useEditorSlots();
  const { alts } = useEditorAlts();
  const { notes } = useEditorNotes();

  const perks = scrape[character.role].perks;

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!buildName.trim()) {
      setError("Build name is required.");
      return;
    }

    // Build the perks payload: only filled slots, alts mapped to { name }
    const perksPayload = perkSlots
      .map((slot, i) =>
        slot
          ? {
              name: slot.name,
              alts: alts[i].map((a) => ({ name: a.name })),
            }
          : null,
      )
      .filter(Boolean);

    const isEdit = !!build;
    const endpoint = isEdit ? "/api/update_build.php" : "/api/save_build.php";
    const body = isEdit
      ? {
          characterName: character.name,
          oldBuildName: build!.name,
          buildName: buildName.trim(),
          perks: perksPayload,
          notes,
        }
      : {
          characterName: character.name,
          buildName: buildName.trim(),
          perks: perksPayload,
          notes,
        };

    setIsSaving(true);
    setError(null);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Something went wrong.");
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["builds"] });
      closeEditorPortal();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-10000000 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-neutral-900 w-[calc(100%-4rem)] h-[calc(100%-4rem)] p-6 rounded-xl flex flex-col gap-4 border border-white/10">
        <CloseButton onClick={() => closeEditorPortal()} />

        <div className="flex flex-1 gap-4 overflow-hidden">
          {/* Left panel */}
          <div className="flex flex-col gap-4 w-1/2 overflow-y-auto pr-2">
            <EditorHeading name={character.name} />
            <BuildNameBlock />
            <PerkSlotsBlock />
            <NotesBlock />
          </div>

          {/* Right panel */}
          <div className="flex flex-col w-1/2 gap-4 overflow-hidden">
            <PerkBrowserBlock perks={perks} />
            <div className="flex flex-col flex-1 bg-neutral-800 rounded-lg border border-white/10 overflow-hidden">
              <div className="flex items-center justify-center p-4 border-b border-white/10">
                <h2 className="font-bold text-lg text-white">Live Preview</h2>
              </div>
              <div className="flex-1 flex items-center justify-center text-neutral-500 text-sm">
                Preview will appear here
              </div>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm font-semibold max-w-64">{error}</p>
        )}

        <Button
          className="max-w-64 bg-otz rounded-md py-2 disabled:opacity-50"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : build ? "Save Build" : "Add Build"}
        </Button>
      </div>
    </div>
  );
};

// ─── Editor (public export) ───────────────────────────────────────────────────

export const Editor = ({ character, build }: EditorProps) => {
  const scrape = useScrape();
  const scrapePerks = scrape[character.role].perks;

  // Build a name→Perk lookup so we can resolve iconUrls for existing alts
  const perkMap = new Map(scrapePerks.map((p) => [p.name, p]));

  const initialAlts: Perk[][] = build
    ? build.perks.slice(0, 4).map((slot) =>
        slot.alts.map((a) => {
          const scraped = perkMap.get(a.name);
          return {
            name: a.name,
            iconUrl: scraped?.iconUrl ?? "",
            description: scraped?.description ?? "",
            obtainment: scraped?.obtainment ?? "",
          };
        }),
      )
    : [[], [], [], []];

  // Pad to always have exactly 4 rows
  while (initialAlts.length < 4) initialAlts.push([]);

  return (
    <EditorProvider initialBuild={build} initialAlts={initialAlts}>
      <EditorInner character={character} build={build} />
    </EditorProvider>
  );
};

//KISS - keep it simple stupid, kwintesencja reacta, kunszt sztuki ogłupiania komponentów
//dla utrzymania czytelnosci kodu itp itd ---------- 600 linijek kodu pozdro dla tych co
//kiedys przejmą ten zajebisty projekt (translate it if u need)
