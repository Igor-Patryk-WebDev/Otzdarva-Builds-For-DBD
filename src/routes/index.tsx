import { createFileRoute } from "@tanstack/react-router";
import { FrontPageHeading } from "@components/UI/FrontPage";
import { RoleSelectButtons } from "@components/UI/RoleSelectButtons";

import { useVariables } from "@hooks/useVariables";

export const Route = createFileRoute("/")({
  component: RootPage,
});

function RootPage() {
  const { formatedDate, isLoading } = useVariables();

  return (
    <main className="flex flex-col center h-screen w-screen p-8">
      <FrontPageHeading />
      <p className='mt-4 mb-8'>Last updated: {isLoading ? "--/--/--" : formatedDate}</p>
      <RoleSelectButtons />
    </main>
  );
}
