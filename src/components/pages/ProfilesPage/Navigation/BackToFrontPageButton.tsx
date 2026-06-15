import { Button } from "@components/shared/Button";
import { IconSVG } from "@components/shared/IconSVG";
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
      onClick={() => window.scrollTo(0, 0)}
    >
      <Button className="bg-otz hover:bg-[hsl(from_var(--color-otz)_h_s_40%)] pl-4 pr-2 py-1 rounded-md flex items-center text-neutral-100">
        Back
        <IconSVG icon="ArrowRight" size={1.5} className="text-neutral-100" />
      </Button>
    </Link>
  );
};
