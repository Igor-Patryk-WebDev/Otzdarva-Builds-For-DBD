import type { ComponentPropsWithoutRef } from "react";
import {
  type IconName,
  IconsData
} from "@/utils/IconsData";
import { Icon } from "@/components/shared/Icon";
import { Link } from "@tanstack/react-router";

type SocialLinkProps = {
  icon: IconName,
  accent: `#${string}`
} & ComponentPropsWithoutRef<"a">

const SocialLink = ({ icon, accent }: SocialLinkProps) => {
  const IconData = IconsData[icon]
  return (
    <Link
      to={IconData?.redirect}
      target="_blank"
      className="relative group"
      style={{ '--social-accent': accent } as React.CSSProperties}
    >
      <span className="absolute top-0 opacity-0 group-hover:-top-8 group-hover:opacity-100 right-1/2 translate-x-1/2 px-2 bg-(--social-accent) rounded-sm transition-all pointer-events-none">{icon}</span>
      <Icon icon={icon} className="hover:text-(--social-accent)" />
    </Link>
  )
}

export const Socials = () => {
  return (
    <div className="mt-8 sm:mt-16">
      <div>
        <div className='grid grid-cols-[1fr_auto_1fr] gap-2 items-center mb-1'>
          <div className='h-px bg-linear-to-l from-otz to-transparent'></div>
          <p className='text-sm sm:text-base font-bold text-center'>Socials</p>
          <div className='h-px bg-linear-to-r from-otz to-transparent'></div>
        </div>
        <div className="w-fit flex gap-3">
          <SocialLink icon="Discord" accent="#5865F2" />
          <SocialLink icon="Youtube" accent="#FF0033" />
          <SocialLink icon="X" accent="#797979" />
          <SocialLink icon="Twitch" accent="#9146FF" />
        </div>
      </div>
    </div>
  );
};
