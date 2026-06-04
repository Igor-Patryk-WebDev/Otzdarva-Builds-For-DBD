import { Button } from "@components/shared/Button";
import { Link } from "@tanstack/react-router";

type NavProps = {};

export const Nav = ({}: NavProps) => {
  return (
    <div className="flex gap-8 my-4">
      <Button color="grey">
        <Link to="/">Main Page</Link>
      </Button>
      <Button color="otz">
        <Link to="/">Survivors</Link>
      </Button>
      <Button color="otz">
        <Link to="/">Killers</Link>
      </Button>
      <Button color="otz">
        <Link to="/">Log Out</Link>
      </Button>
    </div>
  );
};
