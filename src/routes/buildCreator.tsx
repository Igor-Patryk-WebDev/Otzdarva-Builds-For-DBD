import { createFileRoute } from "@tanstack/react-router";
import { useVariables } from "../hooks/useVariables";
import { useBuilds } from "@hooks/useBuilds";

export const Route = createFileRoute("/buildCreator")({
  component: RouteComponent,
});
// const { data: buildData, isLoading } = useBuilds();

function RouteComponent() {
  const { killersList, killerUniversal, survivorsList, isLoading } =
    useVariables();

  if (isLoading) return;
  null;
  return (
    <div className="flex flex-col px-4">
      <h1 className="text-9xl">Build Creator</h1>
      <div className="grid grid-cols-auto">
        {/* <div key={killerUniversal} className="flex w-full">
          <div className="relative h-64 aspect-square">
            <img
              src="/Images/CharPortrait_bg.webp"
              alt="bg"
              className="absolute inset-0 w-full h-full z-0"
            />
            <img
              src="/Images/CharPortrait_roleBG.webp"
              alt="role bg"
              className="absolute inset-0 w-full h-full z-10"
            />
            <img
              src={killerUniversal}
              alt={killerUniversal}
              className="absolute inset-0 w-full h-full z-20"
            />
          </div>
          <div className="h-64"></div>
        </div> */}
        {killersList.map(([name, info]) => (
          <div key={name} className="flex w-full border-b-2">
            <div className="relative h-64 aspect-square">
              <img
                src="/Images/CharPortrait_bg.webp"
                alt="bg"
                className="absolute inset-0 w-full h-full z-0"
              />
              <img
                src="/Images/CharPortrait_roleBG.webp"
                alt="role bg"
                className="absolute inset-0 w-full h-full z-10"
              />
              <img
                src={info.portrait}
                alt={name}
                className="absolute inset-0 w-full h-full z-20"
              />
            </div>
            <div className="flex gap-4 bg-neutral-800 w-full">
              <div className="flex-col bg-neutral-700 max-w-1/4">
                <div className="grid grid-cols-5">
                  <button>X</button>
                  <h2 className="text-4xl text-center col-span-3">
                    Build Name
                  </h2>
                  <button>edit</button>
                </div>
                <div className="flex text-4xl bg-neutral-600 w-fit overflow-hidden">
                  <img
                    src="/Images/perk-background-dark.png"
                    alt="perk"
                    className="aspect-square h-20"
                  />
                  <img
                    src="/Images/perk-background-dark.png"
                    alt="perk"
                    className="aspect-square h-20"
                  />
                  <img
                    src="/Images/perk-background-dark.png"
                    alt="perk"
                    className="aspect-square h-20"
                  />
                  <img
                    src="/Images/perk-background-dark.png"
                    alt="perk"
                    className="aspect-square h-20"
                  />
                </div>
                <div>
                  <p className="text-xl">
                    Reliable and well-rounded build; a good starting point until
                    you find the ideal build for your playstyle. After
                    activating Pain Res when hooking, look out for generators
                    changing color (Surveillance) to know here to strike next.
                    If far away, portals can help get you there and activate
                    Turn Back The Clock for even more damage! This will also
                    make gens turn white until touched again. The last perk is
                    there to help in chase but is totally flexible. Pick what
                    works best for you!
                  </p>
                </div>
              </div>
              <div className="flex-col bg-neutral-700 max-w-1/4">
                <h2 className="text-4xl text-center">Build Name</h2>
                <div className="flex text-4xl bg-neutral-600 w-fit overflow-hidden">
                  <img
                    src="/Images/perk-background-dark.png"
                    alt="perk"
                    className="aspect-square h-20"
                  />
                  <img
                    src="/Images/perk-background-dark.png"
                    alt="perk"
                    className="aspect-square h-20"
                  />
                  <img
                    src="/Images/perk-background-dark.png"
                    alt="perk"
                    className="aspect-square h-20"
                  />
                  <img
                    src="/Images/perk-background-dark.png"
                    alt="perk"
                    className="aspect-square h-20"
                  />
                </div>
                <div>
                  <p className="text-xl">
                    Reliable and well-rounded build; a good starting point until
                    you find the ideal build for your playstyle. After
                    activating Pain Res when hooking, look out for generators
                    changing color (Surveillance) to know here to strike next.
                    If far away, portals can help get you there and activate
                    Turn Back The Clock for even more damage! This will also
                    make gens turn white until touched again. The last perk is
                    there to help in chase but is totally flexible. Pick what
                    works best for you! dsadasfgsdaiuhf gsdiuyafgsdufd
                    fasdiuofgdosaifadsf fasdjhgfadshjkgfas dfhjasdgfldhsaf
                    fhjdsalgfliasdf fdasoiuh
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {survivorsList.map(([name, info]) => (
          <div key={name} className="flex w-full">
            <div className="relative h-64 aspect-square">
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
                className="absolute inset-0 w-full h-full object-cover z-20"
              />
            </div>
            <div className="h-64 w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
