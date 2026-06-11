import type { ProfileData } from "@appTypes/Profiles";
import type { Build, BuildsData } from "@appTypes/Builds";
import type { Perk } from "@appTypes/Scrape";
import { Button } from "@components/shared/Button";
import { useScrape } from "@contexts/AppDataContext";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

type PortalProps = {
  onClose: () => void;
  character: ProfileData;
  build: Build;
};

export default function EditBuildPortal({
  onClose,
  character,
  build,
}: PortalProps) {
  const scrape = useScrape();
  const queryClient = useQueryClient();

  const [perkQuery, setPerkQuery] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [altPanelSlot, setAltPanelSlot] = useState<number | null>(null);
  const [buildName, setBuildName] = useState(build.name);

  const [slots, setSlots] = useState<(Perk | null)[]>(() =>
    build.perks.map(
      (p) => scrape.killers.perks.find((sp) => sp.name === p.name) ?? null,
    ),
  );

  const [alts, setAlts] = useState<Perk[][]>(() =>
    build.perks.map((p) =>
      p.alts.map(
        (alt) =>
          scrape.killers.perks.find((sp) => sp.name === alt.name) ?? {
            name: alt.name,
            iconUrl: "/images/no_perk.png",
            description: "",
            obtainment: "",
          },
      ),
    ),
  );

  const [notes, setNotes] = useState<string[]>(() => {
    const filled = [...build.notes];
    while (filled.length < 4) filled.push("");
    return filled;
  });

  const filtered = scrape.killers.perks.filter((perk) =>
    perk.name.toLowerCase().includes(perkQuery.toLowerCase()),
  );

  const handleSelect = (index: number) => {
    if (slots[index]) {
      setAltPanelSlot(altPanelSlot === index ? null : index);
      setSelectedSlot(null);
    } else {
      setSelectedSlot(selectedSlot === index ? null : index);
      setAltPanelSlot(null);
    }
  };

  const handlePerkSelect = (perk: Perk) => {
    if (altPanelSlot !== null) {
      setAlts((prev) => {
        const updated = [...prev];
        updated[altPanelSlot] = [...updated[altPanelSlot], perk];
        return updated;
      });
      return;
    }
    if (selectedSlot === null) return;
    setSlots((prev) => {
      const updated = [...prev];
      updated[selectedSlot] = perk;
      return updated;
    });
    setSelectedSlot(null);
  };

  const handlePerkDeletion = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSlots((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
    setAlts((prev) => {
      const updated = [...prev];
      updated[index] = [];
      return updated;
    });
    if (altPanelSlot === index) setAltPanelSlot(null);
  };

  const handleAltDeletion = (slotIndex: number, altIndex: number) => {
    setAlts((prev) => {
      const updated = [...prev];
      updated[slotIndex] = updated[slotIndex].filter((_, i) => i !== altIndex);
      return updated;
    });
  };

  const handleSave = async () => {
    const payload = {
      characterName: character.name,
      oldBuildName: build.name,
      buildName,
      perks: slots.map((perk, i) => ({
        name: perk?.name ?? "",
        alts: alts[i].map((alt) => ({ name: alt.name })),
      })),
      notes: notes.filter((n) => n.trim() !== ""),
    };

    const res = await fetch("/api/update_build.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.success) {
      queryClient.setQueryData<BuildsData>(["builds"], (old) => {
        if (!old) return old;
        const killers = old.killers.map((k) => {
          if (k.name !== character.name) return k;
          return {
            ...k,
            builds: (k.builds ?? []).map((b) =>
              b.name === build.name
                ? {
                    name: buildName,
                    perks: slots.map((perk, i) => ({
                      name: perk?.name ?? "",
                      alts: alts[i].map((alt) => ({ name: alt.name })),
                    })),
                    notes: notes.filter((n) => n.trim() !== ""),
                  }
                : b,
            ),
          };
        });
        return { ...old, killers };
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-neutral-900 w-[calc(100%-4rem)] h-[calc(100%-4rem)] p-6 rounded-xl flex flex-col gap-4 border border-white/10">
        <Button
          onClick={onClose}
          color="otz"
          className="absolute top-3 right-3 z-10"
        >
          X
        </Button>

        <div className="flex flex-1 gap-4 overflow-hidden">
          {/* ── LEFT ── */}
          <div className="flex flex-col gap-4 w-1/2 overflow-y-auto pr-2">
            <div className="flex items-center justify-center bg-neutral-800 rounded-lg p-4 border border-white/10">
              <h2 className="font-bold text-3xl text-white text-center">
                {character.name}
              </h2>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-neutral-400 uppercase tracking-widest pl-1">
                Build Name
              </label>
              <input
                type="text"
                value={buildName}
                placeholder="Enter build name..."
                onChange={(e) => setBuildName(e.target.value)}
                className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-otz resize-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-neutral-400 uppercase tracking-widest pl-1">
                Perks
              </label>
              <div className="flex gap-3 bg-neutral-800 rounded-lg p-4 border border-white/10">
                {slots.map((perk, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`flex-1 aspect-square relative ${
                      altPanelSlot === i
                        ? "ring-2 ring-blue-500 rounded-lg"
                        : selectedSlot === i
                          ? "border-otz bg-neutral-600 transition-colors rounded-lg"
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
                        {alts[i].length > 0 && (
                          <span className="absolute bottom-0 left-0 bg-blue-500 text-white text-xs rounded-br-lg rounded-tl-lg px-1">
                            {alts[i].length}
                          </span>
                        )}
                        <Button
                          onClick={(e) => handlePerkDeletion(i, e)}
                          color="otz"
                          className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center text-xs rounded aspect-square shrink-0"
                        >
                          X
                        </Button>
                      </>
                    ) : (
                      <img
                        src="/images/no_perk.png"
                        alt="empty slot"
                        className="relative w-full h-full object-cover rounded-lg cursor-pointer hover:bg-neutral-700 hover:ring-1 hover:ring-otz transition"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Alts Panel */}
              {altPanelSlot !== null && slots[altPanelSlot] && (
                <div className="flex flex-col gap-2 bg-neutral-800 rounded-lg p-4 border border-blue-500/50">
                  <p className="text-xs text-blue-400 uppercase tracking-widest">
                    Alts for{" "}
                    <span className="text-white">
                      {slots[altPanelSlot]?.name}
                    </span>{" "}
                    — pick from browser
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
                          onClick={() => handleAltDeletion(altPanelSlot, j)}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-neutral-400 uppercase tracking-widest pl-1">
                Notes
              </label>
              <div className="flex flex-col gap-2 bg-neutral-800 rounded-lg p-4 border border-white/10">
                {[0, 1, 2, 3].map((i) => (
                  <textarea
                    key={i}
                    value={notes[i]}
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
          </div>

          {/* ── RIGHT ── */}
          <div className="flex flex-col w-1/2 gap-4 overflow-hidden">
            <div className="flex flex-col flex-1 bg-neutral-800 rounded-lg border border-white/10 overflow-hidden">
              <div className="flex flex-col gap-2 p-4 border-b border-white/10">
                <h2 className="font-bold text-lg text-white">
                  {altPanelSlot !== null
                    ? `Adding alts for ${slots[altPanelSlot]?.name}`
                    : "Perk Browser"}
                </h2>
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
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-5 gap-2">
                  {filtered.map((perk) => (
                    <div
                      key={perk.name}
                      onClick={() => handlePerkSelect(perk)}
                      className="aspect-square"
                    >
                      <img
                        src={perk.iconUrl}
                        alt={perk.name}
                        className="w-full h-full object-cover rounded-lg cursor-pointer hover:ring-1 hover:ring-otz hover:bg-neutral-700 transition"
                      />
                      <p className="text-center">{perk.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

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

        <Button
          type="button"
          color="otz"
          className="max-w-64"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
