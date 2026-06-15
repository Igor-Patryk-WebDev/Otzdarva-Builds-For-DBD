const style = {
  hover: "hover:text-[hsl(220,5%,33%)] transition-colors",
  color: "text-[hsl(220,5%,23%)]",
};

export const SelfPlug = () => {
  return (
    <div className="flex flex-col absolute bottom-8">
      <div className={`${style.color} text-sm sm:text-base`}>
        Created by Patryk & Igor
        <div className="flex gap-4 center">
          <a
            href="https://github.com/Igor-Patryk-WebDev"
            target="_blank"
            className={style.hover}
          >
            GitHub
          </a>
          <a
            href="mailto:33patryk.jarosz@gmail.com"
            target="_blank"
            className={style.hover}
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};
