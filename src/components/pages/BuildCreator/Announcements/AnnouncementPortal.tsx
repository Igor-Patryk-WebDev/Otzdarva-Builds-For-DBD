import type { Announcements } from "@appTypes/Announcements";

import { useAnnouncementsJSON } from "@hooks/queries/useAnnouncementsJSON";
import { useState } from "react";
import { Button } from "@components/shared/Button";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  onClose: () => void;
};

export const AnnouncementPortal = ({ onClose }: Props) => {
  const { data } = useAnnouncementsJSON();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [threatLevel, setThreatLevel] = useState(0);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  const addAlert = async () => {
    if (!title || !desc) return;
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
      setExpiresAt(null);
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

  return (
    <div
      className="flex center fixed inset-0 bg-black/50 z-10000"
      onClick={onClose}
    >
      <div
        className="flex flex-col gap-2 bg-neutral-900 w-1/3 h-1/3 p-8 z-1"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl text-center">Add an Announcement</h1>
        <input
          className="w-full bg-neutral-700 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-otz text-sm"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full bg-neutral-700 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-otz text-sm"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-1/2">
            <select
              className="max-h-5 w-full"
              value={threatLevel}
              onChange={(e) => setThreatLevel(Number(e.target.value))}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
            <p>Auto Delete (optional)</p>
            <input
              type="number"
              className="w-full bg-neutral-700 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-otz text-sm"
              placeholder="Hours"
              onChange={(e) =>
                setExpiresAt(e.target.value ? Number(e.target.value) : null)
              }
            />
          </div>
          <div>
            <h4>Threat Levels</h4>
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
      <div
        className="flex flex-col gap-2 bg-neutral-900 w-1/3 h-1/3 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center">PREVIEW</h2>
        {data?.alerts.map((alert) => {
          const timeLeft = alert.expiresAt
            ? new Date(alert.createdAt).getTime() +
              alert.expiresAt * 60 * 60 * 1000 -
              Date.now()
            : null;
          const formatted = timeLeft
            ? timeLeft >= 86400000
              ? `${Math.floor(timeLeft / 86400000)}d ${Math.floor((timeLeft % 86400000) / 3600000)}h`
              : `${Math.floor(timeLeft / 3600000)}h ${Math.floor((timeLeft % 3600000) / 60000)}m`
            : null;

          return (
            <div
              key={alert.id}
              className={`${data.threatLevelsStyles[alert.threatLevel.toString()]} w-full rounded-lg p-3 flex justify-between items-start`}
            >
              <div>
                <h3 className="font-bold text-xl">{alert.title}</h3>
                <p>{alert.desc}</p>
                <p className="text-neutral-600">{formatted}</p>
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
