export interface Perk {
  name: string,
  iconUrl: string,
  description: string,
  obtainment: string
}

export interface Character {
  name: string,
  portraitUrl: string
}

export interface RoleProfile {
  name: string,
  portraitUrl: string
}

export interface RoleData {
  perks: Perk[],
  characters: Character[],
  roleProfiles: RoleProfile[]
}

export interface OtherData {
  scrapeRequestUNIX: number
}

export interface ScrapeData {
  killers: RoleData,
  survivors: RoleData,
  other: OtherData
}