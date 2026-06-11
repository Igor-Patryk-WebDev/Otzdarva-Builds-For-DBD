import type { Alt, Build, Perk } from "./Builds";
import type { DbdRole } from "./DbdRole";
import type { RoleProfile } from "./Scrape";

export interface ProfileAlt extends Alt {
  iconUrl: string | undefined;
  description: string | undefined;
  obtainment: string | undefined;
}

export interface ProfilePerk extends Omit<Perk, "alts"> {
  iconUrl: string | undefined;
  alts: ProfileAlt[];
  description: string | undefined;
  obtainment: string | undefined;
}

export interface ProfileBuild extends Omit<Build, "perks"> {
  perks: ProfilePerk[];
}

export interface ProfileData extends RoleProfile {
  builds: ProfileBuild[] | undefined;
  role: Lowercase<DbdRole>;
}

export interface ProfilesData {
  killers: ProfileData[];
  survivors: ProfileData[];
}
