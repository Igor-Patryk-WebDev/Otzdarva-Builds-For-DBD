import { useState, useEffect, useRef } from "react";
import { BugReportToggleButton } from "./BugReportToggleButton";
import { BugReportModal } from "./BugReportModal";

export const BugReport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) setIsOpen(false);
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="z-1">
      <BugReportModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <BugReportToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};