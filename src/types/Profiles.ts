import type { Alt, Build, Perk } from "./Builds";
import type { RoleProfile } from "./Scrape";

export interface ProfileAlt extends Alt {
  iconUrl: string | undefined;
}

export interface ProfilePerk extends Omit<Perk, "alts"> {
  iconUrl: string | undefined;
  alts: ProfileAlt[];
}

export interface ProfileBuild extends Omit<Build, "perks"> {
  perks: ProfilePerk[];
}

export interface ProfileData extends RoleProfile {
  builds: ProfileBuild[] | null;
}

export interface ProfilesData {
  killers: ProfileData[];
  survivors: ProfileData[];
}
