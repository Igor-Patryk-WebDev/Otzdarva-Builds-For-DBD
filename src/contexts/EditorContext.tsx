import type { ProfilePerk } from "@appTypes/Profiles";
import type { Perk } from "@appTypes/Scrape";
import type { Build } from "@appTypes/Builds";
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface EditorContextValue {
  buildName: string;
  setBuildName: Dispatch<SetStateAction<string>>;

  selectedSlot: number | null;
  setSelectedSlot: Dispatch<SetStateAction<number | null>>;

  perkSlots: (ProfilePerk | null)[];
  setPerkSlots: Dispatch<SetStateAction<(ProfilePerk | null)[]>>;

  alts: Perk[][];
  setAlts: Dispatch<SetStateAction<Perk[][]>>;

  altPanelSlot: number | null;
  setAltPanelSlot: Dispatch<SetStateAction<number | null>>;

  notesCount: number;
  setNotesCount: Dispatch<SetStateAction<number>>;

  notes: string[];
  setNotes: Dispatch<SetStateAction<string[]>>;

  perkQuery: string;
  setPerkQuery: Dispatch<SetStateAction<string>>;

  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
}

interface EditorProviderProps {
  children: ReactNode;
  /** Pass an existing build to seed state for edit mode */
  initialBuild?: Build;
  /** Pre-hydrated alts (with iconUrls resolved from scrape) */
  initialAlts?: Perk[][];
}

const EditorContext = createContext<EditorContextValue>(undefined!);

export const useEditorBuildName = () => {
  const { buildName, setBuildName } = useContext(EditorContext);
  return { buildName, setBuildName };
};

export const useEditorSlots = () => {
  const { selectedSlot, setSelectedSlot, perkSlots, setPerkSlots } =
    useContext(EditorContext);
  return { selectedSlot, setSelectedSlot, perkSlots, setPerkSlots };
};

export const useEditorAlts = () => {
  const { alts, setAlts, altPanelSlot, setAltPanelSlot } =
    useContext(EditorContext);
  return { alts, setAlts, altPanelSlot, setAltPanelSlot };
};

export const useEditorNotes = () => {
  const { notes, setNotes, notesCount, setNotesCount } =
    useContext(EditorContext);
  return { notes, setNotes, notesCount, setNotesCount };
};

export const useEditorPerkBrowser = () => {
  const { perkQuery, setPerkQuery } = useContext(EditorContext);
  return { perkQuery, setPerkQuery };
};

export const useEditorError = () => {
  const { error, setError } = useContext(EditorContext);
  return { error, setError };
};

// ─── Helper: map a Build's perks into the 4-slot shape the editor expects ──────

/** Pads or trims to exactly 4 slots, returning null for empty slots. */
function buildToSlots(build: Build): (ProfilePerk | null)[] {
  const slots: (ProfilePerk | null)[] = [null, null, null, null];
  build.perks.forEach((p, i) => {
    if (i >= 4) return;
    // Build.Perk only has name + alts (no iconUrl). We cast so the context
    // accepts it — the icon will appear once the scrape data is combined.
    slots[i] = p as unknown as ProfilePerk;
  });
  return slots;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export const EditorProvider = ({ children, initialBuild, initialAlts }: EditorProviderProps) => {
  const [buildName, setBuildName] = useState(initialBuild?.name ?? "");

  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [perkSlots, setPerkSlots] = useState<(ProfilePerk | null)[]>(
    initialBuild ? buildToSlots(initialBuild) : [null, null, null, null]
  );

  const [alts, setAlts] = useState<Perk[][]>(
    initialAlts ?? [[], [], [], []]
  );
  const [altPanelSlot, setAltPanelSlot] = useState<number | null>(null);

  const [notesCount, setNotesCount] = useState(4);
  const [notes, setNotes] = useState<string[]>(
    initialBuild?.notes ?? []
  );

  const [perkQuery, setPerkQuery] = useState("");

  const [error, setError] = useState<string | null>(null);

  return (
    <EditorContext
      value={{
        buildName,
        setBuildName,
        selectedSlot,
        setSelectedSlot,
        perkSlots,
        setPerkSlots,
        alts,
        setAlts,
        altPanelSlot,
        setAltPanelSlot,
        notesCount,
        setNotesCount,
        notes,
        setNotes,
        perkQuery,
        setPerkQuery,
        error,
        setError,
      }}
    >
      {children}
    </EditorContext>
  );
};