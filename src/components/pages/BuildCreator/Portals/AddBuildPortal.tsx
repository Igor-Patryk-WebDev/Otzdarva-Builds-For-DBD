import type { ProfileData } from "@appTypes/Profiles";

import { Button } from "@components/shared/Button";

type PortalProps = {
  onClose: () => void;
  character: ProfileData;
};

export default function AddBuildPortal({ onClose, character }: PortalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-neutral-800 w-[calc(100%-4rem)] h-[calc(100%-4rem)] p-8 rounded-xl flex flex-col gap-4 border border-white/10">
        <Button
          onClick={onClose}
          color="otz"
          className="absolute top-1 right-1"
        >
          X
        </Button>
        <div>
          <h2 className="font-bold text-4xl text-center">{character.name}</h2>
          <form>
            <input type="text" placeholder="Build name" />
          </form>
        </div>
        <Button color={"otz"}>Add Build</Button>
      </div>
    </div>
  );
}
