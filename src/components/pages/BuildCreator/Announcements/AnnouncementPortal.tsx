import type { Announcements } from "@appTypes/Announcements";
import { useAnnouncementsJSON } from "@hooks/queries/useAnnouncementsJSON";
import { useState } from "react";
import { Button } from "@components/shared/Button";
import { useQueryClient } from "@tanstack/react-query";
import { useAlertAutoDelete } from "@hooks/announcements/useAlertAutoDelete";
import { DecoratedHeading } from "@components/shared/DecoratedHeading";
import { IconSVG } from "@components/shared/IconSVG";

type Props = {
  onClose: () => void;
};

export const AnnouncementPortal = ({ onClose }: Props) => {
  const { data } = useAnnouncementsJSON();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [threatLevel, setThreatLevel] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const addAlert = async () => {
    if (!title || !desc) return;
    const totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
    const expiresAt = totalSeconds > 0 ? totalSeconds : null;

    const res = await fetch("/api/save_announcement.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, desc, threatLevel, expiresAt }),
    });
    const json = await res.json();
    if (json.success) {
      queryClient.setQueryData<Announcements>(["announcements"], (prev) =>
        prev ? { ...prev, alerts: [...prev.alerts, json.alert] } : prev,
      );
      setTitle("");
      setDesc("");
      setThreatLevel(0);
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }
  };

  const deleteAlert = async (id: string) => {
    const res = await fetch("/api/delete_announcement.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const json = await res.json();
    if (json.success) {
      queryClient.setQueryData<Announcements>(["announcements"], (prev) =>
        prev
          ? { ...prev, alerts: prev.alerts.filter((a) => a.id !== id) }
          : prev,
      );
    }
  };

  useAlertAutoDelete();

  return (
    <div
      className="flex center fixed inset-0 bg-black/50 z-10000"
      onClick={onClose}
    >
      {/* Panel dodawania */}
      <div
        className="flex flex-col gap-2 bg-neutral-900 border border-neutral-800 rounded-md p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <DecoratedHeading text="Announcements" className="text-2xl" />
        <label className="text-sm">
          Title
          <input
            className="w-full bg-neutral-700 border border-white/10 rounded-lg pl-4 pr-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:outline-otz text-sm"
            type="text"
            placeholder="Huge announcement..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="text-sm">
          Description
          <textarea
            placeholder="Description"
            className="w-full bg-neutral-700 border-none outline-none rounded-lg pl-4 pr-4 py-2 text-white placeholder:text-neutral-500 focus:border-otz text-sm"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </label>
        <div className="flex gap-4">
          {/* Lewa kolumna */}
          <div className="flex flex-col gap-2 w-1/2">
            <label className="text-sm">
              Announcement type
              <select
                className="w-full bg-neutral-700 border border-white/10 rounded-lg px-2 py-2 text-white focus:outline-none focus:border-otz text-sm"
                value={threatLevel}
                onChange={(e) => setThreatLevel(Number(e.target.value))}
              >
                <option value={0}>Information</option>
                <option value={1}>Notice</option>
                <option value={2}>Alert</option>
              </select>
            </label>
            <div>
              <p className="text-sm">Auto Delete (optional)</p>
              <div className="flex gap-2">
                <label className="flex flex-col items-center gap-1">
                  <input
                    type="number"
                    min={0}
                    value={days || ""}
                    className="w-full bg-neutral-700 border border-white/10 rounded-lg px-2 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-otz text-sm text-center"
                    placeholder="0"
                    onChange={(e) => setDays(Number(e.target.value) || 0)}
                  />
                  <span className="text-xs text-neutral-500">D</span>
                </label>
                <label className="flex flex-col items-center gap-1">
                  <input
                    type="number"
                    min={0}
                    max={23}
                    value={hours || ""}
                    className="w-full bg-neutral-700 border border-white/10 rounded-lg px-2 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-otz text-sm text-center"
                    placeholder="0"
                    onChange={(e) => setHours(Number(e.target.value) || 0)}
                  />
                  <span className="text-xs text-neutral-500">H</span>
                </label>
                <label className="flex flex-col items-center gap-1">
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={minutes || ""}
                    className="w-full bg-neutral-700 border border-white/10 rounded-lg px-2 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-otz text-sm text-center"
                    placeholder="0"
                    onChange={(e) => setMinutes(Number(e.target.value) || 0)}
                  />
                  <span className="text-xs text-neutral-500">M</span>
                </label>
                <label className="flex flex-col items-center gap-1">
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={seconds || ""}
                    className="w-full bg-neutral-700 border border-white/10 rounded-lg px-2 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-otz text-sm text-center"
                    placeholder="0"
                    onChange={(e) => setSeconds(Number(e.target.value) || 0)}
                  />
                  <span className="text-xs text-neutral-500">S</span>
                </label>
              </div>
            </div>
          </div>
          {/* Prawa kolumna - threat levels */}
          <div className="flex flex-col gap-1">
            <p className="text-neutral-50">Types of announcements:</p>
            <p className="text-neutral-400">
              <span className="text-neutral-50">Information</span> - Just an information
            </p>
            <p className="text-neutral-400">
              <span className="text-neutral-50">Notice</span> - Notice about a known issue
            </p>
            <p className="text-neutral-400">
              <span className="text-neutral-50">Alert</span> - Critical error found
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={addAlert} className="bg-otz rounded-md w-full">
            Add
          </Button>
          <Button
            onClick={onClose}
            className="bg-neutral-600 rounded-md"
          >
            <IconSVG icon="Close" />
          </Button>
        </div>
      </div>

      {/* Panel podglądu */}
      <div
        className="flex flex-col gap-2 bg-neutral-900 w-120 h-90 overflow-auto p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center">PREVIEW</h2>
        {data?.alerts.map((alert) => {
          const timeLeft = alert.expiresAt
            ? new Date(alert.createdAt).getTime() +
            alert.expiresAt * 1000 -
            Date.now()
            : null;
          const formatted =
            timeLeft && timeLeft > 0
              ? timeLeft >= 86400000
                ? `${Math.floor(timeLeft / 86400000)}d ${Math.floor((timeLeft % 86400000) / 3600000)}h`
                : timeLeft >= 3600000
                  ? `${Math.floor(timeLeft / 3600000)}h ${Math.floor((timeLeft % 3600000) / 60000)}m`
                  : timeLeft >= 60000
                    ? `${Math.floor(timeLeft / 60000)}m ${Math.floor((timeLeft % 60000) / 1000)}s`
                    : `${Math.floor(timeLeft / 1000)}s`
              : null;

          return (
            <div
              key={alert.id}
              className={`bg-neutral-800 border ${data.threatLevelsStyles[alert.threatLevel.toString()]} w-full rounded-lg p-3 flex justify-between items-start relative`}
            >
              <div className="w-full">
                <h3 className="font-bold text-lg">{alert.title}</h3>
                <p className="text-xs">{alert.desc}</p>
                <p className="text-neutral-600 text-sm text-right">
                  {formatted ?? "No expiry"}
                </p>
              </div>
              <button
                onClick={() => deleteAlert(alert.id)}
                className="absolute top-2 right-2 text-neutral-600 hover:text-white"
              >
                <IconSVG icon="Close" size={1} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
