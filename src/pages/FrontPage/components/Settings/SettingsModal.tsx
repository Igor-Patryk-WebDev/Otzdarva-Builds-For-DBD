import type { Dispatch, SetStateAction } from "react";
import { Icon } from "@/components/shared/Icon";

type SettingsModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const SettingsModal = ({ isOpen, setIsOpen }: SettingsModalProps) => {
  return (
    <div
      className={`absolute bottom-12 right-0 mb-2 w-72 sm:w-80 rounded-xl bg-neutral-900 border border-neutral-800 p-4 shadow-2xl backdrop-blur-md flex flex-col gap-3 transition-all duration-200 ease-out origin-bottom-right ${
        isOpen
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-2 scale-95 pointer-events-none"
      }`}
    >
      <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
        <div className="flex items-center gap-2">
          <Icon icon="Settings" className="size-5 text-otz" />
          <span className="font-bold text-sm text-neutral-100">Settings</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
        >
          <Icon icon="Close" className="size-5" />
        </button>
      </div>
      <p className="text-xs text-neutral-400 leading-relaxed">
        You can find fully explained settings here
      </p>
      <div className="flex flex-col gap-2 mt-1">
        <a
          href={`https://github.com/Igor-Patryk-WebDev/Otzdarva-Builds-For-DBD/wiki`}
          target="_blank"
          className="w-full flex items-center justify-center gap-2 bg-otz hover:bg-otz-darker text-white py-2 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-center"
        >
          <Icon icon="Github" className="size-5" />
          <span>See wiki</span>
        </a>
      </div>

      <p className="text-xs text-neutral-400 leading-relaxed">
        Settings go here... soon!
      </p>
    </div>
  );
};
