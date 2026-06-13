import type { DbdRole } from "@appTypes/DbdRole";
import { Button } from "@components/shared/Button";
import { Link } from "@tanstack/react-router";
import type { Dispatch, SetStateAction } from "react";

type AdminNavigationProps = {
  setRole: Dispatch<SetStateAction<DbdRole>>
};

export const AdminNavigation = ({ setRole }: AdminNavigationProps) => {
  return (
    <div className="flex gap-8 my-4">
      <Button color="grey">
        <Link to="/" target="_blank">
          Main Page
        </Link>
      </Button>
      <Button color="otz" onClick={() => {
        setRole("Killers")
      }} >
        Killers
      </Button>
      <Button color="otz" onClick={() => {
        setRole("Survivors")
      }} >
        Survivors
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
