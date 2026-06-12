import type { DbdRole } from "@appTypes/DbdRole";

import { Link } from "@tanstack/react-router";

interface RoleSelectButtonProps {
  variant: DbdRole;
}

export const RoleSelectButton = ({ variant }: RoleSelectButtonProps) => {
  const images = {
    Killers: "/images/killer-icon.png",
    Survivors: "/images/survivor-icon.png",
  };
  const styles = {
    Killers: {
      link: "bg-killer",
      img: "",
      text: "",
    },
    Survivors: {
      link: "bg-survivor",
      img: "ml-auto",
      text: "right-4",
    },
  };
  return (
    <Link
      to={`/${variant.toLowerCase()}` as "/killers" | "/survivors"}
      className={`${styles[variant]["link"]} block p-4 w-full relative`}
      viewTransition={{
        types: () => (variant === "Killers" ? ["slide-right"] : ["slide-left"]),
      }}
    >
      <img
        src={images[variant]}
        alt={variant}
        className={`${styles[variant]["img"]} h-64`}
      />
      <h3
        className={`${styles[variant]["text"]} font-bold text-3xl absolute bottom-4`}
      >
        {variant.toUpperCase()}
      </h3>
    </Link>
  );
};
