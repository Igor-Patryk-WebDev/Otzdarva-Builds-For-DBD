type Props = {};

export default function TopText({}: Props) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <img src="/Images/favicon.png" alt="OtzLogo" className="h-10" />
        <h2 className="text-[3rem] font-bold font-[Inter]">
          <span className="text-pinky pl-2">Otzdarva</span> builds for
        </h2>
      </div>
      <h1 className="text-[6rem] leading-none font-bold text-center">
        DEAD BY DAYLIGHT
      </h1>
    </div>
  );
}
