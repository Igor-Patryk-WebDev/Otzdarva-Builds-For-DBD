import { Button } from "@components/shared/Button"
import { Link, useRouterState } from "@tanstack/react-router"

export const ChangeRolePageButton = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isOnKillersPage = pathname.startsWith("/killers")
  return (
    <Link to={isOnKillersPage ? "/survivors" : "/killers"} viewTransition={{
      types: ({ fromLocation }) =>
        fromLocation?.href == "/killers" ? ["slide-left"] : ["slide-right"]
    }}>
      <Button color="otz">SWAP</Button>
    </Link>
  )
}