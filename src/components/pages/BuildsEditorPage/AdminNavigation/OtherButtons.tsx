import { Button } from "@components/shared/Button";
import { Link, useNavigate } from "@tanstack/react-router";

type OtherButtonsProps = {}

export const OtherButtons = ({ }: OtherButtonsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2">
      <Button
        preset="otz"
        className="px-3 rounded-md"
      >
        <p>Main Page</p>
        <Link
          to="/"
          target="_blank"
        >

        </Link>
      </Button>
      <Button
        className="border-2 border-otz px-3 rounded-md"
        onClick={async () => {
          await fetch("/api/logout.php", { method: "POST" });
          navigate({ to: "/login" });
        }}
      >
        Log Out
      </Button>
    </div>
  )
}