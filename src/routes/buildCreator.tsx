import { createFileRoute } from "@tanstack/react-router";
import { useVariables } from "../hooks/useVariables";

export const Route = createFileRoute("/buildCreator")({
  component: RouteComponent,
});

function RouteComponent() {
  const { killersList, killerUniversal, survivorsList, isLoading } = useVariables();

  if (isLoading) return null;

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
        {killersList.map(([name, info]) => (
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
            {/* <div className="h-64 w-3/4 ">
              {builds[type].map(([characterName, BuildInfo]) => (
                <div key={characterName} className="">
                  <h2>{characterName}</h2>
                </div>
              ))}
            </div> */}
          </div>
        ))}
        {survivorsList.map(([name, info]) => (
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
