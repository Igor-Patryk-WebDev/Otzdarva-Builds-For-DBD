import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Announcements } from "@appTypes/Announcements";

export const useAlertAutoDelete = () => {
  const queryClient = useQueryClient();
  const savedCallback = useRef(() => {});

  useEffect(() => {
    savedCallback.current = async () => {
      const data = queryClient.getQueryData<Announcements>(["announcements"]);
      if (!data) return;

      const expired = data.alerts.filter((alert) => {
        if (!alert.expiresAt) return false;
        const expiresAt =
          new Date(alert.createdAt).getTime() +
          alert.expiresAt * 60 * 60 * 1000;
        return expiresAt <= Date.now();
      });

      for (const alert of expired) {
        const res = await fetch("/api/delete_announcement.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: alert.id }),
        });
        const json = await res.json();
        if (json.success) {
          queryClient.setQueryData<Announcements>(["announcements"], (prev) =>
            prev
              ? {
                  ...prev,
                  alerts: prev.alerts.filter((a) => a.id !== alert.id),
                }
              : prev,
          );
        }
      }
    };
  }, [queryClient]);

  useEffect(() => {
    const interval = setInterval(() => savedCallback.current(), 60_000);
    return () => clearInterval(interval);
  }, []);
};
