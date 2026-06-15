import { Button } from "@components/shared/Button";

type Props = {
  onClose: () => void;
};

export const AnnouncementPortal = ({ onClose }: Props) => {
  return (
    <div className="flex center fixed inset-0 bg-black/50 z-10000">
      <div className="flex flex-col gap-2 bg-neutral-900 w-1/3 h-1/3 p-8">
        <h1 className="text-2xl text-center">Add an Announcement</h1>
        <input
          className="w-full bg-neutral-700 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-otz text-sm"
          type="text"
          placeholder="Title"
        />
        <textarea
          placeholder="Description"
          className="w-full bg-neutral-700 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-otz text-sm"
        />
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-1/2">
            <select name="" id="" className="max-h-5 w-full">
              <option value="">0</option>
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
            </select>
            <p>Auto Delete (optional)</p>
            <input
              type="number"
              className="w-full bg-neutral-700 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-otz text-sm"
              placeholder="Hours"
            />
          </div>
          <div>
            <h4>Threat Levels</h4>
            <p>
              <span className="text-blue-500">0</span> - No threat, just a
              message
            </p>
            <p>
              <span className="text-green-400">1</span> - Minor Threat
            </p>
            <p>
              <span className="text-yellow-300">2</span> - Medium Threat
            </p>
            <p>
              <span className="text-red-500">3</span> - Critical Threat
            </p>
          </div>
        </div>
        <Button onClick={onClose} className="bg-otz rounded-lg">
          X
        </Button>
      </div>
      <div className="flex flex-col gap-2 bg-neutral-900 w-1/3 h-1/3 p-8">
        <h2>preview</h2>
      </div>
    </div>
  );
};
