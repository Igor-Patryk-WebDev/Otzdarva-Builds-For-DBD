import type { DbdRole } from "@/types/profiles.types"

import { Keybind } from "@/components/shared/Keybind";
import { Link } from "@tanstack/react-router";

type RoleSelectButtonProps = {
  role: DbdRole;
}

export const RoleSelectButton = ({ role }: RoleSelectButtonProps) => {
  const images = {
    killers: "/images/killer-icon.png",
    survivors: "/images/survivor-icon.png",
  };

  const styles = {
    killers: {
      link: "border-killers",
      gradient: "from-killers",
    },
    survivors: {
      link: "border-survivors",
      gradient: "from-survivors",
    },
  };

  return (
    <Link
      to={`/${role}`}
      className={`${styles[role].link} sm:w-1/2 sm:hover:w-2/3 inset-shadow-[0_0_4px] inset-shadow-almost-black sm:gap-3 gap-1 border-2 bg-linear-to-t ${styles[role].gradient} to-neutral-900 rounded-xl block active:scale-97 p-4 sm:p-4 relative isolate transition-all`}
      viewTransition={{
        types: ["to-survivors"],
      }}
    >
      {true &&
        <Keybind className={`absolute top-0 -translate-y-1/2 hidden sm:block ${role === "killers" ? "left-0 -rotate-3 -translate-x-1/2" : "right-0 rotate-3 translate-x-1/2"}`}>
          {role === "killers" ? "Q" : "E"}
        </Keybind>
      }
      <div className="flex flex-row sm:flex-col items-center">
        <div className="flex justify-center aspect-square sm:h-40 h-20">
          <img
            src={images[role]}
            alt={`${role} role icon`}
          />
        </div>
        <div className="flex w-full justify-center">
          <div>
            <h3 className="text-center uppercase font-bold text-xl sm:text-2xl leading-1 mt-4 mb-2">
              {role}
            </h3>
            <p className="text-center text-sm text-neutral-400">Search builds for {role}</p>
          </div>
        </div>
      </div>
    </Link >
  );
};
