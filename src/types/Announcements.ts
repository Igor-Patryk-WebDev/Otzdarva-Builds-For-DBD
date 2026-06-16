export type Alert = {
  id: string;
  title: string;
  desc: string;
  threatLevel: number;
  expiresAt: number | null;
  createdAt: string;
};

export type Announcements = {
  alerts: Alert[];
  threatLevelsStyles: Record<string, string>;
};
