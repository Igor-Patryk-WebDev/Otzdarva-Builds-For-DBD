import { createFileRoute } from "@tanstack/react-router";
import { killerList, killerUniversal, survivorList } from "../data/variables";
import builds from "../data/builds.json";

export const Route = createFileRoute("/buildCreator")({
  component: RouteComponent,
});

const killerBuilds = Object.entries(builds.killers);
function RouteComponent() {
  return (
    <div className="flex flex-col">
      <h1 className="text-9xl">Build Creator</h1>
      <div className="grid grid-cols-1">
        <div key={killerUniversal} className="flex w-full">
          <div className="relative w-1/4 h-64">
            <img
              src="/Images/CharPortrait_bg.webp"
              alt="bg"
              className="absolute inset-0 w-full h-full object-contain z-0"
            />
            <img
              src="/Images/CharPortrait_roleBG.webp"
              alt="role bg"
              className="absolute inset-0 w-full h-full object-contain z-10"
            />
            <img
              src={killerUniversal}
              alt={killerUniversal}
              className="absolute inset-0 w-full h-full object-contain z-20"
            />
          </div>
          <div className="h-64 w-3/4"></div>
        </div>
        {killerList.map(([name, info]) => (
          <div key={name} className="flex w-full">
            <div className="relative w-1/4 h-64">
              <img
                src="/Images/CharPortrait_bg.webp"
                alt="bg"
                className="absolute inset-0 w-full h-full object-contain z-0"
              />
              <img
                src="/Images/CharPortrait_roleBG.webp"
                alt="role bg"
                className="absolute inset-0 w-full h-full object-contain z-10"
              />
              <img
                src={info.portrait}
                alt={name}
                className="absolute inset-0 w-full h-full object-contain z-20"
              />
            </div>
            <div className="h-64 w-3/4 ">
              {killerBuilds.map(([characterName, BuildInfo]) => (
                <div key={characterName} className="">
                  {console.log(characterName, BuildInfo)}
                  <h2>{B}</h2>
                </div>
              ))}
            </div>
          </div>
        ))}
        {survivorList.map(([name, info]) => (
          <div key={name} className="flex w-full">
            <div className="relative w-1/4 h-64">
              <img
                src="/Images/CharPortrait_bg.webp"
                alt="bg"
                className="absolute inset-0 w-full h-full object-contain z-0"
              />
              <img
                src="/Images/CharPortrait_roleBG.webp"
                alt="role bg"
                className="absolute inset-0 w-full h-full object-contain z-10"
              />
              <img
                src={info.portrait}
                alt={name}
                className="absolute inset-0 w-full h-full object-contain z-20"
              />
            </div>
            <div className="h-64 w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
