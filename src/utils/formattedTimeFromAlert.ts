import type { Alert } from "@/types/announcements.types";

export const formattedTimeFromAlert = (alert: Alert) => {
  const timeLeft = alert.expiresAt
    ? new Date(alert.createdAt).getTime() + alert.expiresAt * 1000 - Date.now()
    : null;

  const formattedTime =
    timeLeft && timeLeft > 0
      ? timeLeft >= 86400000
        ? `${Math.floor(timeLeft / 86400000)}d ${Math.floor(
          (timeLeft % 86400000) / 3600000
        )}h left`
        : timeLeft >= 3600000
          ? `${Math.floor(timeLeft / 3600000)}h ${Math.floor(
            (timeLeft % 3600000) / 60000
          )}m left`
          : timeLeft >= 60000
            ? `${Math.floor(timeLeft / 60000)}m ${Math.floor(
              (timeLeft % 60000) / 1000
            )}s left`
            : `${Math.floor(timeLeft / 1000)}s left`
      : null;

  return formattedTime
}