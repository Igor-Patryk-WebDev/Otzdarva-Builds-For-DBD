import Button from "@components/shared/Button"
import { Link } from "@tanstack/react-router"

export const BackToFrontPageButton = () => {
  return (
    <Button>
      <Link to='/'>WRÓĆ</Link>
    </Button>
  )
}