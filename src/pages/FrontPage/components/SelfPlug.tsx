export const SelfPlug = () => {
  return (
    <div className="flex flex-col absolute bottom-8 sm:left-8">
      <div className={`text-[hsl(220,5%,23%)] text-xs sm:text-sm`}>
        <span className="flex gap-1 center sm:justify-start">
          Created by{" "}
          <a
            href="https://github.com/Igor-Patryk-WebDev"
            target="_blank"
            className="hover:text-[hsl(220,5%,33%)] transition-colors underline"
          >
            Igor & Patryk
          </a>
        </span>
        <div className="flex gap-2 center sm:justify-start">
          <a
            href="mailto:33patryk.jarosz@gmail.com"
            className="hover:text-[hsl(220,5%,33%)] transition-colors underline"
          >
            Contact us
          </a>
          <a
            href="https://github.com/Igor-Patryk-WebDev/Otzdarva-Builds-For-DBD/discussions/categories/ideas"
            target="_blank"
            className="hover:text-[hsl(220,5%,33%)] transition-colors underline"
          >
            Have an idea?
          </a>
        </div>
      </div>
    </div>
  );
};
