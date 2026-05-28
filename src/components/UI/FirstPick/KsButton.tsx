type Props = {
  variant: "Killer" | "Survivor";
  onClick?: () => void;
};

export default function KsButton({ variant, onClick }: Props) {
  const styles = {
    Killer: "",
    Survivor: "",
  };

  const image = {
    Killer: "/Images/killer-icon.png",
    Survivor: "/Images/survivor-icon.png",
  };

  return (
    <button
      onClick={onClick}
      className={`flex flex-col center border-3 rounded-3xl p-8 cursor-pointer ${styles[variant]}`}
    >
      <div className="flex flex-col center gap-4">
        <img src={image[variant]} alt={variant} className="h-64" />
        <h3 className="font-bold text-3xl">{variant.toUpperCase()}</h3>
      </div>
    </button>
  );
}
