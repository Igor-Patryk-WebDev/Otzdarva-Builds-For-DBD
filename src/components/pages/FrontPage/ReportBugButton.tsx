import { useState, useEffect, useRef } from "react";
import { IconSVG } from "@components/shared/IconSVG";

export const ReportBugButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const email = "huelleigor1@outlook.com";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Panel Popover */}
      <div
        className={`absolute bottom-12 right-0 mb-2 w-72 sm:w-80 rounded-xl bg-neutral-900/95 border border-neutral-800 p-4 shadow-2xl backdrop-blur-md flex flex-col gap-3 transition-all duration-200 ease-out origin-bottom-right ${isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-2 scale-95 pointer-events-none"
          }`}
      >
        <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
          <div className="flex items-center gap-2">
            <IconSVG icon="Bug" className="text-otz" size={1.2} />
            <span className="font-bold text-sm text-neutral-100">
              Report a Bug
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
          >
            <IconSVG icon="Close" size={1} />
          </button>
        </div>

        <p className="text-xs text-neutral-400 leading-relaxed">
          Found an issue? Let us know so we can fix it! You can copy our support
          email or open your email app.
        </p>

        <div className="bg-neutral-950/85 border border-neutral-800/80 rounded-lg p-2.5 font-mono text-xs select-all text-neutral-300 flex items-center justify-between">
          <span>{email}</span>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          <button
            onClick={handleCopy}
            className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${copied
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-neutral-850 hover:bg-neutral-800 text-neutral-200 border border-neutral-800"
              }`}
          >
            <IconSVG icon={copied ? "Check" : "Copy"} size={1} />
            <span>{copied ? "Email Copied!" : "Copy Email to Clipboard"}</span>
          </button>

          <a
            href={`mailto:${email}?subject=Otzdarva Builds Bug Report`}
            className="w-full flex items-center justify-center gap-2 bg-otz hover:bg-otz-darker text-white py-2 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer text-center"
          >
            <IconSVG icon="Mail" size={1} />
            <span>Open Email Client</span>
          </a>
        </div>
      </div>

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 py-2 px-3.5 rounded-full border bg-neutral-900/40 hover:bg-neutral-900/80 backdrop-blur-sm transition-all duration-200 cursor-pointer shadow-lg group ${isOpen
            ? "border-otz text-neutral-100"
            : "border-neutral-800 text-neutral-400 hover:text-neutral-200"
          }`}
      >
        <span className="text-xs font-medium hidden sm:block">Found a bug?</span>
        <IconSVG
          icon="Bug"
          className={`transition-transform duration-200 group-hover:scale-110 ${isOpen ? "text-otz" : "text-neutral-400 group-hover:text-otz"
            }`}
          size={1.1}
        />
      </button>
    </div>
  );
};