// Main Page

import { createFileRoute } from "@tanstack/react-router";
import TopText from "../components/UI/FirstPick/TopText";
import ButtonBox from "../components/UI/FirstPick/ButtonBox";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="flex flex-col center h-screen w-screen">
      <TopText />
      <p>Last updated: xxxxxx</p>
      <ButtonBox />
    </main>
  );
}
