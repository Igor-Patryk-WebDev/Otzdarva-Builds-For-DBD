import { useGlobalAppActions } from '@/hooks/stores/useGlobalAppStore';
import { useState } from 'react';
import { Icon } from '@/components/shared/Icon';

type RoleSwitcherButtonsProps = {}

export const RoleSwitcherButtons = ({ }: RoleSwitcherButtonsProps) => {
  const [isOpen] = useState();
  const { setSelectedRole } = useGlobalAppActions();
  return (
    <div className="flex gap-2">
      <button
        onClick={() => setSelectedRole("killers")}
        className={`flex items-center p-2 rounded-xl border border-killers bg-linear-90 from-killers to-neutral-900/40 backdrop-blur-sm transition-all duration-200 cursor-pointer shadow-lg active:border-otz group`}
      >
        <div className={`grid transition-[grid-template-columns] grid-cols-[1fr] px-2`}
        >
          <span className="text-xs font-medium block text-nowrap">Killers</span>
        </div>
        <Icon
          icon="ArrowDown"
          className={`size-5 transition-transform duration-200 group-hover:scale-110 ${isOpen ? "text-otz" : "text-neutral-400 group-hover:text-otz"}`}
        />
      </button>
      <button
        onClick={() => setSelectedRole("survivors")}
        className={`flex items-center p-2 rounded-xl border border-survivors bg-linear-90 from-neutral-900/40 to-survivors backdrop-blur-sm transition-all duration-200 cursor-pointer shadow-lg active:border-otz group`}
      >
        <div className={`grid transition-[grid-template-columns] grid-cols-[1fr] px-2`}
        >
          <span className="text-xs font-medium block text-nowrap">Survivors</span>
        </div>
        <Icon
          icon="ArrowDown"
          className={`size-5 transition-transform duration-200 group-hover:scale-110 ${isOpen ? "text-otz" : "text-neutral-400 group-hover:text-otz"}`}
        />
      </button>
    </div>
  )
}