import type { Dispatch, SetStateAction } from 'react';
import type { DbdRole } from '@appTypes/DbdRole';

import { Button } from '@components/shared/Button';

type RoleSwitcherButtonsProps = {
  setRole: Dispatch<SetStateAction<DbdRole>>;
}

export const RoleSwitcherButtons = ({ setRole }: RoleSwitcherButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        preset="otz"
        className="px-3 rounded-md"
        onClick={() => {
          setRole("Killers");
        }}
      >
        Killers
      </Button>
      <Button
        preset="otz"
        className="px-3 rounded-md"
        onClick={() => {
          setRole("Survivors");
        }}
      >
        Survivors
      </Button>
    </div>
  )
}