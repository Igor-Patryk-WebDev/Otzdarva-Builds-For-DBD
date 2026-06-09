import { Button } from "@components/shared/Button";
import { Link } from "@tanstack/react-router";

type AdminNavigationProps = {};

export const AdminNavigation = ({}: AdminNavigationProps) => {
  return (
    <div className="flex gap-8 my-4">
      <Button color="grey">
        <Link to="/" target="_blank">
          Main Page
        </Link>
      </Button>
      <Button color="otz">
        <Link to="/survivors" target="_blank">
          Survivors
        </Link>
      </Button>
      <Button color="otz">
        <Link to="/killers" target="_blank">
          Killers
        </Link>
      </Button>
      <Button
        color="otz"
        onClick={async () => {
          await fetch("/api/logout.php", { method: "POST" });
        }}
      >
        <Link to="/login">Log Out</Link>
      </Button>
    </div>
  );
};
