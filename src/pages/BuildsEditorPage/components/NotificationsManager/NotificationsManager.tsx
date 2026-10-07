import type { AnnouncementsData } from "@/types/announcements.types";

import {
  useNotificationsManagerPortalActions,
  useNotificationsManagerPortalState
} from "@/hooks/stores/BuildsEditorStores/useNotificationsManagerPortalStore";
import { NotificationsManagerNotificationTypeButtons } from "./NotificationsManagerNotificationTypeButtons";
import { NotificationsManagerNotificationTimerInputs } from "./NotificationsManagerNotificationTimerInputs";
import { NotificationsManagerDescriptionTextarea } from "./NotificationsManagerDescriptionTextarea";
import { NotificationsManagerPublishButton } from "./NotificationsManagerPublishButton";
import { NotificationsManagerTitleInput } from "./NotificationsManagerTitleInput";
import { NotificationsManagerHeading } from "./NotificationsManagerHeading";
import { useAnnouncementsJSON } from "@/hooks/queries/useAnnouncementsJSON";
import { useAlertAutoDelete } from "@/hooks/announcements/useAlertAutoDelete";
import { NotificationPanel } from "@/components/NotificationPanel";
import { useQueryClient } from "@tanstack/react-query";
import { useHotkey } from "@tanstack/react-hotkeys";
import { useState } from "react";
import { Icon } from "@/components/shared/Icon";

export const NotificationsManager = () => {
  const queryClient = useQueryClient();
  const { data } = useAnnouncementsJSON();

  const isNotificationsEditorPortalOpen = useNotificationsManagerPortalState();
  const { closeNotificationsManagerPortal } = useNotificationsManagerPortalActions();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [threatLevel, setThreatLevel] = useState(0);

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useHotkey("Escape", () => {
    if (isNotificationsEditorPortalOpen) {
      closeNotificationsManagerPortal();
    }
  });

  const addAlert = async () => {
    if (!title.trim() || !desc.trim() || isSubmitting) return;
    setIsSubmitting(true);

    const totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
    const expiresAt = totalSeconds > 0 ? totalSeconds : null;

    try {
      const res = await fetch("/api/save_announcement.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, desc, threatLevel, expiresAt }),
      });
      const json = await res.json();
      if (json.success) {
        queryClient.setQueryData<AnnouncementsData>(["announcements"], (prev) =>
          prev ? { ...prev, alerts: [...prev.alerts, json.alert] } : prev
        );
        setTitle("");
        setDesc("");
        setThreatLevel(0);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    } catch (err) {
      console.error("Failed to add announcement:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteAlert = async (id: string) => {
    try {
      const res = await fetch("/api/delete_announcement.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (json.success) {
        queryClient.setQueryData<AnnouncementsData>(["announcements"], (prev) =>
          prev
            ? { ...prev, alerts: prev.alerts.filter((a) => a.id !== id) }
            : prev
        );
      }
    } catch (err) {
      console.error("Failed to delete announcement:", err);
    }
  };

  useAlertAutoDelete();

  return (
    <div
      className="relative h-full overflow-y-auto p-4 max-w-4xl bg-neutral-900 backdrop-blur-md border border-neutral-800 rounded-xl shadow-2xl flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      <NotificationsManagerHeading />
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 h-full overflow-y-auto">
        <div className="lg:col-span-7 pr-4 space-y-5 border-b lg:border-b-0 lg:border-r border-neutral-800">
          <NotificationsManagerTitleInput
            value={title}
            setter={setTitle}
          />
          <NotificationsManagerDescriptionTextarea
            value={desc}
            setter={setDesc}
          />
          <NotificationsManagerNotificationTypeButtons
            threatLevel={threatLevel}
            setThreatLevel={setThreatLevel}
          />
          <NotificationsManagerNotificationTimerInputs
            days={days}
            setDays={setDays}
            hours={hours}
            setHours={setHours}
            minutes={minutes}
            setMinutes={setMinutes}
            seconds={seconds}
            setSeconds={setSeconds}
          />

          <NotificationsManagerPublishButton
            title={title}
            desc={desc}
            isSubmitting={isSubmitting}
            addAlert={addAlert}
          />
        </div>

        <div className="lg:col-span-5 pl-4 bg-neutral-900/20 flex flex-col gap-4">
          <div className="flex-1 overflow-y-auto space-y-3 max-h-117 scrollbar-none">
            {(!data?.alerts || data.alerts.length === 0) && (
              <div className="h-full min-h-48 flex flex-col items-center justify-center text-center p-6 border border-dashed border-neutral-800 rounded-xl">
                <div className="p-3 rounded-full bg-neutral-900 text-neutral-500 mb-2">
                  <Icon icon="Information" className="size-5" />
                </div>
                <p className="text-sm font-medium text-neutral-300">
                  No active announcements
                </p>
                <p className="text-xs text-neutral-500 mt-1 max-w-56">
                  Create a new announcement on the left to publish site-wide.
                </p>
              </div>
            )}

            {data?.alerts.map((alert) => {
              return (
                <div className="relative">
                  <button
                    onClick={() => deleteAlert(alert.id)}
                    className="absolute top-3 right-3 p-1 rounded-md text-neutral-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer"
                    title="Delete announcement"
                    aria-label="Delete announcement"
                  >
                    <Icon icon="Close" className="size-5" />
                  </button>
                  <NotificationPanel alert={alert} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
