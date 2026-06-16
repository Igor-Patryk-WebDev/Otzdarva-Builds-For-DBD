import { useAnnouncementsJSON } from "@hooks/queries/useAnnouncementsJSON";

type Props = {};

export const AnnouncementsPortal = ({}: Props) => {
  const { data } = useAnnouncementsJSON();

  return (
    <div
      className="flex flex-col gap-2 bg-neutral-900 w-1/3 h-1/3 p-8"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-center">Announcements</h2>
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
          </div>
        );
      })}
    </div>
  );
};
