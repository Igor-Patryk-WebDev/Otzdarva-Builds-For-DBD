import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Icon } from "@/components/shared/Icon";

type OtherButtonsProps = {};

export const OtherButtons = ({ }: OtherButtonsProps) => {
  const navigate = useNavigate();
  const [isOpen] = useState();

  return (
    <div className="flex gap-2">
      <Link
        to="/"
        target="_blank"
        className={`flex items-center p-2 rounded-xl border border-otz bg-linear-90 from-otz/70 to-neutral-900/40 hover:bg-otz/80 active:bg-otz/80 backdrop-blur-sm transition-all duration-200 text-neutral-200 cursor-pointer shadow-lg group`}
      >
        <div className={`grid transition-[grid-template-columns] grid-cols-[1fr] px-2`}>
          <span className="text-xs font-medium block text-nowrap">Front Page</span>
        </div>
        <Icon
          icon="ArrowRight"
          className={`size-5 transition-transform duration-200 group-hover:scale-110 text-neutral-100`}
        />
      </Link>
      <button
        onClick={async () => {
          await fetch("/api/logout.php", { method: "POST" });
          navigate({ to: "/login" });
        }}
        className={`flex items-center p-2 rounded-xl border bg-neutral-900/40 hover:bg-neutral-900/80 backdrop-blur-sm transition-all duration-200 cursor-pointer shadow-lg active:border-otz group ${isOpen
          ? "border-otz text-neutral-100"
          : "border-neutral-800 text-neutral-400 hover:text-neutral-200"
          }`}
      >
        <div className={`grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-[grid-template-columns] group-hover:px-2 ${isOpen
          && "grid-cols-[1fr] px-2"
          }`}>
          <div className="overflow-hidden">
            <span className="text-xs font-medium block text-nowrap">Log out</span>
          </div>
        </div>
        <Icon
          icon="Logout"
          className={`size-5 transition-transform duration-200 group-hover:scale-110 ${isOpen ? "text-otz" : "text-neutral-400 group-hover:text-otz"}`}
        />
      </button>
    </div>
  );
};
