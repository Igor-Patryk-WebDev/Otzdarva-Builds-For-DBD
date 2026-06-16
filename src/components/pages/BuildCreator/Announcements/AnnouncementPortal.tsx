import type { Announcements } from "@appTypes/Announcements";
import { useAnnouncementsJSON } from "@hooks/queries/useAnnouncementsJSON";
import { useState } from "react";
import { Button } from "@components/shared/Button";
import { useQueryClient } from "@tanstack/react-query";
import { useAlertAutoDelete } from "@hooks/announcements/useAlertAutoDelete";

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
        className="flex flex-col gap-2 bg-neutral-900 h-90 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl text-center">Add an Announcement</h1>
        <input
          className="w-full bg-neutral-700 border border-white/10 rounded-lg pl-4 pr-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-otz text-sm"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full bg-neutral-700 border border-white/10 rounded-lg pl-4 pr-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-otz text-sm"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="flex gap-4">
          {/* Lewa kolumna */}
          <div className="flex flex-col gap-2 w-1/2">
            <select
              className="w-full bg-neutral-700 border border-white/10 rounded-lg px-2 py-2 text-white focus:outline-none focus:border-otz text-sm"
              value={threatLevel}
              onChange={(e) => setThreatLevel(Number(e.target.value))}
            >
              <option value={0}>0 - No threat</option>
              <option value={1}>1 - Minor</option>
              <option value={2}>2 - Medium</option>
              <option value={3}>3 - Critical</option>
            </select>
            <p className="text-sm text-neutral-400">Auto Delete (optional)</p>
            <div className="flex gap-2">
              <div className="flex flex-col items-center gap-1">
                <input
                  type="number"
                  min={0}
                  value={days || ""}
                  className="w-full bg-neutral-700 border border-white/10 rounded-lg px-2 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-otz text-sm text-center"
                  placeholder="0"
                  onChange={(e) => setDays(Number(e.target.value) || 0)}
                />
                <span className="text-xs text-neutral-500">D</span>
              </div>
              <div className="flex flex-col items-center gap-1">
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
              </div>
              <div className="flex flex-col items-center gap-1">
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
              </div>
              <div className="flex flex-col items-center gap-1">
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
              </div>
            </div>
          </div>
          {/* Prawa kolumna - threat levels */}
          <div className="flex flex-col gap-1">
            <h4 className="font-bold">Threat Levels</h4>
            <p>
              <span className="text-blue-500">0</span> - No threat, just a
              message
            </p>
            <p>
              <span className="text-green-400">1</span> - Minor Threat
            </p>
            <p>
              <span className="text-yellow-300">2</span> - Medium Threat
            </p>
            <p>
              <span className="text-red-500">3</span> - Critical Threat
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={addAlert} className="bg-otz rounded-lg w-full">
            Add
          </Button>
          <Button
            onClick={onClose}
            className="bg-neutral-600 rounded-lg w-fit px-4"
          >
            X
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
              className={`${data.threatLevelsStyles[alert.threatLevel.toString()]} w-full rounded-lg p-3 flex justify-between items-start`}
            >
              <div className="w-full">
                <h3 className="font-bold text-xl">{alert.title}</h3>
                <p>{alert.desc}</p>
                <p className="text-neutral-600 text-right">
                  {formatted ?? "No expiry"}
                </p>
              </div>
              <button
                onClick={() => deleteAlert(alert.id)}
                className="text-neutral-600 hover:text-white ml-2"
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
