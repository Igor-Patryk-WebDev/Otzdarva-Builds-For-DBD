import type { DbdRole } from "@appTypes/DbdRole";

import { Link } from "@tanstack/react-router";

interface RoleSelectButtonProps {
  role: DbdRole;
}

export const RoleSelectButton = ({ role }: RoleSelectButtonProps) => {
  const lowercaseRole = role.toLowerCase() as Lowercase<DbdRole>

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
      to={`/${lowercaseRole}`}
      className={`${styles[lowercaseRole].link} border-2 bg-linear-to-t ${styles[lowercaseRole].gradient} to-neutral-900 rounded-md block p-2 sm:p-4 sm:h-64 h-32 overflow-clip relative sm:w-1/2 sm:hover:w-2/3 sm:transition-all`}
      viewTransition={{
        types: () => (role === "Killers" ? ["slide-right"] : ["slide-left"]),
      }}
    >
      <img
        src={images[lowercaseRole]}
        alt={`${role} role icon`}
        className="absolute top-10 right-1/2 translate-x-1/2 h-32 sm:h-64"
      />
      <h3 className="text-center uppercase font-bold text-xl sm:text-2xl">
        {lowercaseRole}
      </h3>
    </Link >
  );
};
