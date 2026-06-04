import { Button } from "@components/shared/Button";
import { Nav } from "@components/UI/AdminPanel/Nav";
import { useProfiles } from "@contexts/AppDataContext";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/buildCreator")({
  component: RouteComponent,
});

function RouteComponent() {
  const profiles = useProfiles();

  const killerProfiles = profiles.killers;
  const survivorProfiles = profiles.survivors;

  return (
    <div className="px-4 overflow-y-clip">
      <Nav />
      <div className="grid grid-cols-1 gap-4">
        {killerProfiles.map((character) => {
          return (
            <div key={character.name} className="flex w-full">
              <div className="flex flex-col">
                <div className="relative h-64 aspect-square">
                  <img
                    src="/images/CharPortrait_bg.webp"
                    alt="bg"
                    className="absolute inset-0 w-full h-full z-0"
                  />
                  <img
                    src="/images/CharPortrait_roleBG.webp"
                    alt="role bg"
                    className="absolute inset-0 w-full h-full z-10"
                  />
                  <img
                    src={
                      character.portraitUrl ?? "/images/Unknown_Character.webp"
                    }
                    alt={character.name}
                    className="absolute inset-0 w-full h-full z-20"
                  />
                  <Button
                    color="otz"
                    className="absolute bottom-0 z-30 right-[50%] translate-x-[50%]"
                  >
                    Add Build
                  </Button>
                </div>
              </div>
              <div className="flex gap-4 h-fit bg-neutral-800 flex-1 min-w-0">
                {character.builds &&
                  character.builds.map((build) => {
                    return (
                      <div
                        key={character.name + build.name}
                        className="flex flex-col max-w-1/3 center p-4"
                      >
                        <h3 className="text-4xl">{build.name}</h3>
                        <div className="flex gap-2">
                          {build.perks.map((perk) => (
                            <div key={perk.name} className="flex">
                              <img
                                src={perk.iconUrl}
                                alt={perk.name}
                                className="max-h-24"
                              />
                            </div>
                          ))}
                        </div>
                        <div>
                          <ul className="list-disc pl-5">
                            {build.notes.map((note, k) => {
                              if (note) {
                                return (
                                  <li
                                    key={
                                      character.name +
                                      build.name +
                                      "note" +
                                      String(k)
                                    }
                                  >
                                    <p>{note}</p>
                                  </li>
                                );
                              }
                            })}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
        {survivorProfiles.map((character) => (
          <div key={character.name} className="flex w-full">
            <div className="relative h-64 aspect-square">
              <img
                src="/images/CharPortrait_bg.webp"
                alt="bg"
                className="absolute inset-0 w-full h-full object-contain z-0"
              />
              <img
                src="/images/CharPortrait_roleBG.webp"
                alt="role bg"
                className="absolute inset-0 w-full h-full object-contain z-10"
              />
              <img
                src={character.portraitUrl ?? "/images/Unknown_Character.webp"}
                alt={character.name}
                className="absolute inset-0 w-full h-full object-cover z-20"
              />
            </div>
            <div className="flex h-64 bg-neutral-800 w-screen">
              {character.builds &&
                character.builds.map((build) => {
                  console.log(build);
                  return (
                    <div
                      key={character.name + build.name}
                      className="flex flex-col"
                    >
                      <h3 className="text-4xl">{build.name}</h3>
                      <div className="flex gap-2">
                        {build.perks.map((perk) => (
                          <div key={perk.name} className="flex">
                            <img
                              src={perk.iconUrl}
                              alt={perk.name}
                              className="max-h-24"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
