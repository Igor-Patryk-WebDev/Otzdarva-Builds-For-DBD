import { createFileRoute } from "@tanstack/react-router";
import { killerList } from "../data/variables";

export const Route = createFileRoute("/buildCreator")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col">
      <h1 className="text-9xl">Build Creator</h1>
      <div className="grid grid-cols-2">
        {killerList.map(([name, info]) => (
          <div key={name} className="w-full">
            <div className="relative w-64 h-64">
              <img
                src="/Images/CharPortrait_bg.webp"
                alt="bg"
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
              <img
                src="/Images/CharPortrait_roleBG.webp"
                alt="role bg"
                className="absolute inset-0 w-full h-full object-cover z-10"
              />
              <img
                src={info.portrait}
                alt={name}
                className="absolute inset-0 w-full h-full object-contain z-20"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
