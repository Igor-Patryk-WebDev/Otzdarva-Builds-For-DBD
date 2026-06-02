export interface Perk {
  name: string;
  hasAlt: string[] | null;
}

export interface Build {
  perks: Record<string, Perk>;
  buildNotes: string[];
}

export type CharacterBuilds = Record<string, Build>;

export type RoleBuilds = Record<string, CharacterBuilds>;

export interface BuildsData {
  survivors: RoleBuilds;
  killers: RoleBuilds;
}
