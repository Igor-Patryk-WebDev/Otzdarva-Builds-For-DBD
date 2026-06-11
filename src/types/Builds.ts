export interface Alt {
  name: string;
}

export interface Perk {
  name: string;
  alts: Alt[];
}

export interface Build {
  name: string;
  perks: Perk[];
  notes: string[];
}

export interface BuildsProfile {
  name: string;
  builds: Build[] | undefined;
}

export interface BuildsData {
  killers: BuildsProfile[];
  survivors: BuildsProfile[];
}
