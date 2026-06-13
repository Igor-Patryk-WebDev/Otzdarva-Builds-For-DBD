import { SVG } from "./icons";

export const SocialWrapper = () => {
  return (
    <div className="mt-16">
      <div>

      </div>
      <div>
        <div className='grid grid-cols-[1fr_auto_1fr] gap-2 items-center mb-1'>
          <div className='h-px bg-linear-to-l from-otz to-transparent'></div>
          <p className='text-lg font-bold text-center'>Socials</p>
          <div className='h-px bg-linear-to-r from-otz to-transparent'></div>
        </div>
        <div className="w-fit flex gap-4">
          <SVG icon="Discord" classname="hover:text-[#5865F2]" />
          <SVG icon="Youtube" classname="hover:text-[#FF0033]" />
          <SVG icon="X" classname="hover:text-[#797979]" />
          <SVG icon="Twitch" classname="hover:text-[#9146FF]" />
        </div>
      </div>
    </div>
  );
};
