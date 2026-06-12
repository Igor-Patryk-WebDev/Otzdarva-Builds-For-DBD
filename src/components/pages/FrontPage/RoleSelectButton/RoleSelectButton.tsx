import type { DbdRole } from "@appTypes/DbdRole";

import { Link } from "@tanstack/react-router";

interface RoleSelectButtonProps {
  variant: DbdRole
}

export const RoleSelectButton = ({ variant }: RoleSelectButtonProps) => {
  const images = {
    Killers: "/images/killer-icon.png",
    Survivors: "/images/survivor-icon.png",
  }
  const styles = {
    Killers: {
      gradient: "killer",
      link: "border-killer",
      img: "",
      text: "text-center",
      flex: "flex-0"
    },
    Survivors: {
      gradient: "survivor",
      link: "border-survivor",
      img: "ml-auto",
      text: "text-center",
      flex: "flex-1"
    }
  }
  return (
    <Link
      to={`/${variant.toLowerCase()}` as "/killers" | "/survivors"}
      className={`${styles[variant]["link"]} border-2 bg-linear-to-t from-${styles[variant].gradient} to-neutral-900 rounded-md block px-4 py-4 h-64 w-full overflow-clip relative`}
      viewTransition={{ types: () => variant === "Killers" ? ["slide-right"] : ["slide-left"] }}>
      <img src={images[variant]} alt={variant} className={`${styles[variant]['img']} absolute top-16 right-1/2 translate-x-1/2 h-64`} />
      <h3 className={`${styles[variant]['text']} font-bold text-2xl`}>{variant.toUpperCase()}</h3>
    </Link>
  )
}