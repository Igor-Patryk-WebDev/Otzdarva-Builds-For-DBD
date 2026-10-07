import type { DbdRole } from "@/types/profiles.types";

import { useGlobalAppActions, useSelectedRole } from "@/hooks/stores/useGlobalAppStore";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Icon } from "@/components/shared/Icon";

export const ChangeRolePageButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const selectedRole = useSelectedRole();
  const { setSelectedRole } = useGlobalAppActions();

  const targetRole: DbdRole = selectedRole === "killers" ? "survivors" : "killers"

  return (
    <Link
      to={`/${targetRole}`}
      onClick={() => {
        window.scrollTo({ top: 0, left: 0 });
        setSelectedRole(targetRole);
        setIsClicked(true);
      }}
      viewTransition={{
        types: () =>
          selectedRole === "killers" ? ["killers-to-survivors"] : ["survivors-to-killers"],
      }}
    >
      <button
        className={`
          p-2 active:text-neutral-100
          border rounded-xl active:border-otz
          bg-linear-90 backdrop-blur-sm shadow-lg
          flex items-center justify-end
          transition-all duration-200
          cursor-pointer group
          ${selectedRole === "killers"
            ? "border-killers from-killers to-neutral-900/40"
            : "border-survivors from-neutral-900/40 to-survivors"
          }`}
      >
        <div className={`grid grid-cols-[0fr] group-hover:grid-cols-[1fr] group-hover:px-2 transition-[grid-template-columns] ${isClicked && "grid-cols-[1fr] px-2"}`}>
          <div className="overflow-hidden">
            <span className="block text-xs font-medium text-nowrap">Switch</span>
          </div>
        </div>
        <Icon
          icon="Switch"
          className={`
            size-5
            text-neutral-400
            group-hover:text-inherit group-hover:scale-110 
            transition-transform duration-200
          `}
        />
      </button>
    </Link>
  );
};
