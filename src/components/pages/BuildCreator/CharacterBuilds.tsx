import type { ProfileData } from "@appTypes/Profiles";
import { Button } from "@components/shared/Button";

interface Props {
  character: ProfileData;
}

export function CharacterBuilds({ character }: Props) {
  return (
    <div className="flex gap-4 h-fit bg-neutral-800 flex-1 min-w-0 p-4">
      {character.builds &&
        character.builds.map((build) => {
          return (
            <div
              key={character.name + build.name}
              className="flex flex-col max-w-1/3 center p-4"
            >
              <div className="flex">
                <Button color="otz">Delete</Button>
                <h3 className="text-4xl flex-1 mx-4">{build.name}</h3>
                <Button color="otz">Edit</Button>
              </div>
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
              {build.notes && build.notes.length > 0 && (
                <div>
                  <ul className="list-disc pl-5">
                    {build.notes.map((note, k) => {
                      if (note) {
                        return (
                          <li
                            key={
                              character.name + build.name + "note" + String(k)
                            }
                          >
                            <p>{note}</p>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
