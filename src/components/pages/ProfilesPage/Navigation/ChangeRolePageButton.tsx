import { Button } from "@components/shared/Button";
import { Link, useRouterState } from "@tanstack/react-router";

export const ChangeRolePageButton = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isOnKillersPage = pathname.startsWith("/killers");
  return (
    <Link
      to={isOnKillersPage ? "/survivors" : "/killers"}
      onClick={() => window.scrollTo(0, 0)}
      viewTransition={{
        types: ({ fromLocation }) =>
          fromLocation?.href == "/killers" ? ["killers-to-survivors"] : ["survivors-to-killers"],
      }}
    >
      <Button className="bg-otz hover:bg-[hsl(from_var(--color-otz)_h_s_40%)] active:scale-95 px-4 py-1 rounded-md">SWAP</Button>
    </Link>
  );
};
