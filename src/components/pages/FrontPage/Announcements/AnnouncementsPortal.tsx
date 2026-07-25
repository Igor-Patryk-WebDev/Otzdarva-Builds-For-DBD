import { useAnnouncementsJSON } from "@hooks/queries/useAnnouncementsJSON";
import { DecoratedHeading } from "@components/shared/DecoratedHeading";
import { createPortal } from "react-dom";

export const AnnouncementsPortal = () => {
  const { data, error } = useAnnouncementsJSON();

  if (error) console.error(error)

  return (
    createPortal(
      <div className="absolute top-0 sm:top-20 right-0 sm:right-4 w-full max-w-120">
        <div
          className="flex flex-col gap-2 bg-neutral-900 border border-neutral-800 shadow shadow-neutral-950 rounded-none sm:rounded-md p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <DecoratedHeading text="Announcements" gap={2} className="text-xl" />
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
                      : `<1m`
                : null;

            return (
              <div
                key={alert.id}
                className={`bg-neutral-800 border ${data.threatLevelsStyles[alert.threatLevel]} w-full rounded-lg p-3 flex justify-between items-start`}
              >
                <div className="w-full">
                  <h3 className="font-bold text-lg">{alert.title}</h3>
                  <p className="whitespace-break-spaces text-xs">{alert.desc}</p>
                  <p className="text-neutral-600 text-sm text-right">{formatted}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>,
      document.body
    )
  );
};
