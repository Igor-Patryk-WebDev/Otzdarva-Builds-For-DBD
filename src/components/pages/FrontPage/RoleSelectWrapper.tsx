import { RoleSelectButton } from "./RoleSelectButton";

export const RoleSelectWrapper = () => {
  return (
    <div className="flex sm:flex-row flex-col w-185 max-w-full gap-2">
      <RoleSelectButton role="Killers" />
      <RoleSelectButton role="Survivors" />
    </div>
  );
};
