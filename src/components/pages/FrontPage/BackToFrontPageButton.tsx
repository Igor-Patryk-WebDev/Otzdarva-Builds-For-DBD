import { Button } from "@components/shared/Button"
import { Link } from "@tanstack/react-router"

export const BackToFrontPageButton = () => {
  return (
    <Link to='/' className='absolute top-0 right-4' viewTransition={{
      types: ({ fromLocation }) =>
        fromLocation?.href == "/killers" ? ["slide-left"] : ["slide-right"]
    }}>
      <Button>WRÓĆ</Button>
    </Link>
  )
}