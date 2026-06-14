import { Button } from "@components/shared/Button";
import { Link } from "@tanstack/react-router";

export const BackToFrontPageButton = () => {
  return (
    <Link
      to="/"
      className=""
      viewTransition={{
        types: ({ fromLocation }) =>
          fromLocation?.href == "/killers" ? ["slide-left"] : ["slide-right"],
      }}
    >
      <Button className="bg-otz px-6 py-1 rounded-lg">GO BACK</Button>
    </Link>
  );
};
