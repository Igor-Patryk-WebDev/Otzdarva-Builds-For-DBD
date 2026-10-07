import type { IconName } from "./IconsData"

type ThreatLevelConfigType = {
  level: 0 | 1 | 2
  name: "Information" | "Notice" | "Watch Out"
  desc: string
  badgeClass: string
  borderClass: string
  icon: IconName
}

export const THREAT_LEVEL_CONFIG: ThreatLevelConfigType[] = [
  {
    level: 0,
    name: "Information",
    desc: "General site update or note",
    badgeClass: "text-otz",
    borderClass: "border-l-otz",
    icon: "Information",
  },
  {
    level: 1,
    name: "Notice",
    desc: "Important notice or known issue",
    badgeClass: "text-yellow-400",
    borderClass: "border-l-yellow-400",
    icon: "Alert",
  },
  {
    level: 2,
    name: "Watch Out",
    desc: "Urgent issue or critical bug",
    badgeClass: "text-red-500",
    borderClass: "border-l-red-500",
    icon: "Bug",
  },
];