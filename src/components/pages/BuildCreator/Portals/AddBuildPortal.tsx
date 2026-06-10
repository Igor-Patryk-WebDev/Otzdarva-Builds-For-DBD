import type { ProfileData } from "@appTypes/Profiles";
import type { Perk } from "@appTypes/Scrape";
import { Button } from "@components/shared/Button";
import { useScrape } from "@contexts/AppDataContext";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

type PortalProps = {
  onClose: () => void;
  character: ProfileData;
};

const EMPTY_SLOTS = [null, null, null, null];

export default function AddBuildPortal({ onClose, character }: PortalProps) {
  const scrape = useScrape();
  const [perkQuery, setPerkQuery] = useState("");
  const filtered = scrape.killers.perks.filter((perk) =>
    perk.name.toLowerCase().includes(perkQuery.toLowerCase()),
  );
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const [slots, setSlots] = useState<Perk[] | null>(EMPTY_SLOTS);

  const [buildName, setBuildName] = useState("");

  const [notes, setNotes] = useState(["", "", "", ""]);

  const handleSelect = (index: number) => {
    selectedSlot === index ? setSelectedSlot(null) : setSelectedSlot(index);
  };

  const handlePerkSelect = (perk: Perk) => {
    if (selectedSlot === null) return;

    setSlots((prev) => {
      const updated = [...prev];
      updated[selectedSlot] = perk;
      return updated;
    });

    setSelectedSlot(null);
  };

  const handlePerkDeletion = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // onClick nie schodzi glebiej na rodzica tylko zostaje w tym mini buttonie
    setSlots((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  };

  const handleSave = async () => {
    const payload = {
      characterName: character.name,
      buildName,
      perks: slots.map((perk) => perk?.name ?? undefined),
      notes: notes.filter((n) => n.trim() !== ""),
    };

    const res = await fetch("/api/save_build.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.success) {
      await queryClient.invalidateQueries({ queryKey: ["builds"] });
      onClose();
    }
  };

  const queryClient = useQueryClient();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-neutral-900 w-[calc(100%-4rem)] h-[calc(100%-4rem)] p-6 rounded-xl flex flex-col gap-4 border border-white/10">
        {/* Close button */}
        <Button
          onClick={onClose}
          color="otz"
          className="absolute top-3 right-3 z-10"
        >
          X
        </Button>

        {/* Main 50/50 split */}
        <div className="flex flex-1 gap-4 overflow-hidden">
          {/* ── LEFT: Edit Panel ── */}
          <div className="flex flex-col gap-4 w-1/2 overflow-y-auto pr-2">
            {/* Character Name */}
            <div className="flex items-center justify-center bg-neutral-800 rounded-lg p-4 border border-white/10">
              <h2 className="font-bold text-3xl text-white text-center">
                {character.name}
              </h2>
            </div>

            {/* Build Name Input */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-neutral-400 uppercase tracking-widest pl-1">
                Build Name
              </label>
              <input
                type="text"
                placeholder="Enter build name..."
                onChange={(e) => setBuildName(e.target.value)}
                className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-otz resize-none"
              />
            </div>

            {/* Perks */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-neutral-400 uppercase tracking-widest pl-1">
                Perks
              </label>
              <div className="flex gap-3 bg-neutral-800 rounded-lg p-4 border border-white/10">
                {slots.map((perk, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`flex-1 aspect-square relative
                      ${
                        selectedSlot === i
                          ? "border-otz bg-neutral-600 transition-colors rounded-lg"
                          : "border-neutral-600 hover:border-neutral-400"
                      }
                      `}
                  >
                    {perk ? (
                      <>
                        <img
                          src={perk.iconUrl}
                          alt={perk.name}
                          className="w-full h-full object-cover rounded-lg cursor-pointer hover:bg-neutral-700 hover:ring-1 hover:ring-otz transition"
                        />
                        <Button
                          onClick={(e) => handlePerkDeletion(i, e)}
                          color="otz"
                          className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center text-xs rounded aspect-square shrink-0 "
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
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-neutral-400 uppercase tracking-widest pl-1">
                Notes
              </label>
              <div className="flex flex-col gap-2 bg-neutral-800 rounded-lg p-4 border border-white/10">
                {[0, 1, 2, 3].map((i) => (
                  <textarea
                    key={i}
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

          {/* ── RIGHT: Perk Browser + Preview ── */}
          <div className="flex flex-col w-1/2 gap-4 overflow-hidden">
            {/* TOP: Perk Browser */}
            <div className="flex flex-col flex-1 bg-neutral-800 rounded-lg border border-white/10 overflow-hidden">
              {/* Header + Search */}
              <div className="flex flex-col gap-2 p-4 border-b border-white/10">
                <h2 className="font-bold text-lg text-white">Perk Browser</h2>
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

              {/* Perk Grid */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-5 gap-2">
                  {/* Placeholder perk slots — replace with mapped perk data */}
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

            {/* BOTTOM: Live Preview */}
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

        {/* Add Build Button */}
        <Button
          type="button"
          color="otz"
          className="max-w-64"
          onClick={handleSave}
        >
          Add Build
        </Button>
      </div>
    </div>
  );
}
