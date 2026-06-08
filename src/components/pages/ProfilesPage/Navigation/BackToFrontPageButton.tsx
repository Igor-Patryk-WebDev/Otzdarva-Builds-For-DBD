import { Button } from "@components/shared/Button"
import { Link } from "@tanstack/react-router"

export const BackToFrontPageButton = () => {
  return (
    <Link to='/' className='' viewTransition={{
      types: ({ fromLocation }) =>
        fromLocation?.href == "/killers" ? ["slide-left"] : ["slide-right"]
    }}>
      <Button color="otz">GO BACK</Button>
    </Link>
  )
}