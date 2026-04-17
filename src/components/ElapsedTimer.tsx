import React, { useEffect, useState } from "react";
import { formatDuration } from "../services/runService.ts";

interface ElapsedTimerProps {
  startedAt: string;
}

export default function ElapsedTimer({ startedAt }: ElapsedTimerProps) {
  const [elapsed, setElapsed] = useState("00:00:00");

  useEffect(() => {
    const start = new Date(startedAt).getTime();

    const tick = () => {
      const now = Date.now();
      const ms = now - start;
      const totalSeconds = Math.floor(ms / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setElapsed(
        [hours, minutes, seconds]
          .map((v) => String(v).padStart(2, "0"))
          .join(":")
      );
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startedAt]);

  return <span className="font-mono text-lg">{elapsed}</span>;
}
