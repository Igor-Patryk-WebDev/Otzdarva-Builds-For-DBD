import { IconSVG } from "@components/shared/IconSVG";
import { Link } from "@tanstack/react-router";
import { IconsData, type IconName } from "@utils/IconsData";

interface SocialLinkProps {
  icon: IconName
  className: string
}

const SocialLink = ({ icon, className }: SocialLinkProps) => {
  const IconData = IconsData[icon]
  return (
    <Link to={IconData?.redirect} target="_blank">
      <IconSVG icon={icon} className={className} />
    </Link>
  )
}

export const SocialWrapper = () => {
  return (
    <div className="mt-8 sm:mt-16">
      <div>
        <div className='grid grid-cols-[1fr_auto_1fr] gap-2 items-center mb-1'>
          <div className='h-px bg-linear-to-l from-otz to-transparent'></div>
          <p className='text-base sm:text-lg font-bold text-center'>Socials</p>
          <div className='h-px bg-linear-to-r from-otz to-transparent'></div>
        </div>
        <div className="w-fit flex gap-4">
          <SocialLink icon="Discord" className="hover:text-[#5865F2] h-1" />
          <SocialLink icon="Youtube" className="hover:text-[#FF0033] h-1" />
          <SocialLink icon="X" className="hover:text-[#797979] h-1" />
          <SocialLink icon="Twitch" className="hover:text-[#9146FF] h-1" />
        </div>
      </div>
    </div>
  );
};
