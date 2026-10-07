import { useState } from "react";
import { Button } from "@/components/shared/Button";
import { Icon } from "@/components/shared/Icon";

export const ScrapeWikiButton = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const handleScrape = async () => {
    if (status === "loading") return;
    setStatus("loading");

    try {
      const res = await fetch("/api/request_scrape.php", {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        console.error(data.error);
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setTimeout(() => {
        setStatus("idle");
      }, 3500);
    }
  };

  return (
    <Button
      preset="otz"
      className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all group cursor-pointer hover:shadow-lg hover:shadow-otz/20 disabled:opacity-70"
      onClick={handleScrape}
      disabled={status === "loading"}
    >
      <div className="flex items-center gap-3">
        <div className="p-1.5 rounded-md bg-black/30 group-hover:bg-black/40 transition-colors">
          {status === "loading" ? (
            <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : status === "success" ? (
            <Icon icon="Check" className="text-emerald-400 size-5" />
          ) : status === "error" ? (
            <Icon icon="Alert" className="text-amber-400 size-5" />
          ) : (
            <Icon icon="Copy" className="text-white size-5" />
          )}
        </div>
        <div className="flex flex-col text-left">
          <span className="font-semibold text-white">
            {status === "loading"
              ? "Scraping..."
              : status === "success"
                ? "Scrape Triggered"
                : status === "error"
                  ? "Scrape Failed"
                  : "Scrape Wiki"}
          </span>
          <span className="text-xs text-white/70">
            {status === "loading"
              ? "Updating DBD Wiki data..."
              : status === "success"
                ? "Background scrape job queued"
                : status === "error"
                  ? "Check console for details"
                  : "Fetch latest characters & perks"}
          </span>
        </div>
      </div>
      <Icon
        icon="ArrowRight"
        className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all size-5"
      />
    </Button>
  );
};
