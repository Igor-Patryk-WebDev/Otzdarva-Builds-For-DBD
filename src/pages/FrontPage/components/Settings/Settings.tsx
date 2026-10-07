import { useEffect, useRef, useState } from 'react';
import { SettingsToggleButton } from './SettingsToggleButton';
import { SettingsModal } from './SettingsModal';

export const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null)

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
      <SettingsModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <SettingsToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}