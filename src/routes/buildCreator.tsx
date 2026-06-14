import type { DbdRole } from "@appTypes/DbdRole";

import { createFileRoute, redirect } from "@tanstack/react-router";
import { CharacterBuildsBlock } from "@components/pages/BuildCreator/CharacterBuildsBlock";
import { EditorPortalWrapper } from "@components/pages/BuildCreator/EditorPortalWrapper/EditorPortalWrapper";
import { AdminNavigation } from "@components/pages/BuildCreator/AdminNavigation";
import { useProfiles } from "@contexts/AppDataContext";
import { useState } from "react";

export const Route = createFileRoute("/buildCreator")({
  beforeLoad: async () => {
    const res = await fetch("/api/session.php");
    if (!res.ok) throw redirect({ to: "/login" });
  },
  component: BuildCreatorPage,
});

function BuildCreatorPage() {
  const [role, setRole] = useState<DbdRole>("Killers");
  const lowercaseRole = role.toLowerCase() as Lowercase<DbdRole>;
  const profiles = useProfiles();
  const [query, setQuery] = useState("");
  const filtered = profiles[lowercaseRole].filter((profile) =>
    profile.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section className="px-32 py-16">
      <AdminNavigation setRole={setRole} onSearch={setQuery} />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] justify-items-center gap-y-24 gap-x-8 py-16">
        {query.length > 0
          ? filtered.map((character) => (
              <CharacterBuildsBlock character={character} />
            ))
          : profiles[lowercaseRole].map((character) => (
              <CharacterBuildsBlock character={character} />
            ))}
      </div>
      <EditorPortalWrapper />
    </section>
  );
}
