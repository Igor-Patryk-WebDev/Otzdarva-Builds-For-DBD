import builds from "../../../data/builds.json";

export default function CharacterBuilds() {
  return (
    <div>
      {Object.entries(builds.survivors).map(
        ([characterName, characterBuilds]) => (
          <div key={characterName}>
            <h2>{characterName}</h2>

            {Object.entries(characterBuilds).map(([buildName, buildData]) => (
              <div key={buildName}>
                <h3>{buildName}</h3>

                <ul>
                  {Object.values(buildData.perks).map((perk, index) => (
                    <li key={index}>
                      {perk.name}
                      {perk.alternative && " (alternatywa)"}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ),
      )}
    </div>
  );
}
