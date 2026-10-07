import { useState } from "react";
import { Icon } from "@/components/shared/Icon";
import { Link } from "@tanstack/react-router";

export const BackToFrontPageButton = () => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <Link
      to="/"
      className=""
      viewTransition={{
        types: ({ fromLocation }) =>
          fromLocation?.href == "/killers" ? ["slide-left"] : ["slide-right"],
      }}
      onClick={() => window.scrollTo(0, 0)}
    >
      <button
        onClick={() => setIsClicked(true)}
        className="flex items-center p-2 rounded-xl border border-neutral-800 active:border-otz active:text-neutral-100 bg-neutral-900/40 hover:bg-neutral-900/80 backdrop-blur-sm transition-all duration-200 cursor-pointer shadow-lg group"
      >
        <div className={`grid grid-cols-[0fr] group-hover:grid-cols-[1fr] group-hover:px-2 transition-[grid-template-columns] ${isClicked && "grid-cols-[1fr] px-2"}`}>
          <div className="overflow-hidden">
            <span className="text-xs font-medium block text-nowrap">Go back</span>
          </div>
        </div>
        <Icon
          icon="ArrowRight"
          className={`size-5 transition-transform duration-200 group-hover:scale-110 text-neutral-400 group-hover:text-otz`}
        />
      </button>
    </Link>
  );
};
