import { type Dispatch, type SetStateAction, useState } from "react";
import { Icon } from "@/components/shared/Icon";

type BugReportModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const BugReportModal = ({ isOpen, setIsOpen }: BugReportModalProps) => {
  const [copied, setCopied] = useState(false);

  const email = "patrykigor.webdev@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
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
          <Icon icon="Bug" className="size-5 text-otz" />
          <span className="font-bold text-sm text-neutral-100">
            Report a Bug
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
        >
          <Icon icon="Close" className="size-5" />
        </button>
      </div>

      <p className="text-xs text-neutral-400 leading-relaxed">
        Found an issue? <br /> Let us know on Github so we can fix it! <br />
        (You might need an account to report an issue)
      </p>

      <div className="flex flex-col gap-2 mt-1">
        <a
          href={`https://github.com/Igor-Patryk-WebDev/Otzdarva-Builds-For-DBD/issues`}
          target="_blank"
          className="w-full flex items-center justify-center gap-2 bg-otz hover:bg-otz-darker text-white py-2 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-center"
        >
          <Icon icon="Github" className="size-5" />
          <span>Report an issue</span>
        </a>
      </div>
      <p className="text-xs text-neutral-400 leading-relaxed">
        Or send us an email
      </p>
      <div className="bg-neutral-950/85 border border-neutral-800/80 rounded-lg p-2.5 font-mono text-xs select-all text-neutral-300 flex items-center justify-between">
        <span>{email}</span>
      </div>
      <div className="flex flex-col gap-2 mt-1">
        <button
          onClick={handleCopy}
          className={`w-full flex items-center justify-center gap-2 py-2 px-3 border rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            copied
              ? "bg-emerald-600 text-white border-emerald-600"
              : "bg-neutral-850 hover:bg-neutral-800 text-neutral-200 border-neutral-800"
          }`}
        >
          <Icon icon={copied ? "Check" : "Copy"} className="size-5" />
          <span>{copied ? "Email Copied!" : "Copy Email to Clipboard"}</span>
        </button>

        <a
          href={`mailto:${email}?subject=Otzdarva Builds Bug Report`}
          className="w-full flex items-center justify-center gap-2 bg-otz hover:bg-otz-darker text-white py-2 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-center"
        >
          <Icon icon="Mail" className="size-5" />
          <span>Open Email Client</span>
        </a>
      </div>
    </div>
  );
};
