import { Link } from "@tanstack/react-router";

const style = {
  hover: "hover:text-[hsl(220,5%,33%)] transition-colors",
  color: "text-[hsl(220,5%,23%)]",
};

export const SelfPlug = () => {
  return (
    <div className="flex flex-col absolute bottom-8">
      <p className={style.color}>
        Website provided by Patryk and Igor
        <div className="flex gap-4 center">
          <Link to="/" target="_blank" className={style.hover}>
            GitHub
          </Link>
          <Link
            to="mailto:33patryk.jarosz@gmail.com"
            target="_blank"
            className={style.hover}
          >
            Contact
          </Link>
        </div>
      </p>
    </div>
  );
};
