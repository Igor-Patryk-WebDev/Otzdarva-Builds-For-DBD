import KsButton from "./KsButton";

type Props = {};

export default function ButtonBox({}: Props) {
  return (
    <div className="flex center gap-8">
      <KsButton variant="Killer" />
      <KsButton variant="Survivor" />
    </div>
  );
}
