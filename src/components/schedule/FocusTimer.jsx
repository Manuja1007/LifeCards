import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";

export default function FocusTimer() {
  const { timer, completeFocusSession, focusSessions } = useApp();
  const { status, remaining, totalSeconds, start, pause, reset, workCompleted } = timer;

  useEffect(() => {
    if (workCompleted) completeFocusSession();
  }, [workCompleted, completeFocusSession]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const progress = totalSeconds > 0 ? 1 - remaining / totalSeconds : 0;
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="bg-card border border-stroke rounded-2xl p-6 flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-4">
        <h3 className="text-heading font-semibold text-sm">Focus Timer</h3>
        <span className="text-muted text-xs">{focusSessions} sessions done</span>
      </div>

      <div className="relative w-36 h-36 mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--color-stroke)" strokeWidth="6" />
          <motion.circle
            cx="60" cy="60" r="54" fill="none"
            stroke={status === "break" ? "var(--color-emerald)" : "var(--color-accent)"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-heading text-3xl font-bold font-mono">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
          <span className="text-muted text-[10px] mt-1 uppercase tracking-wider">
            {status === "idle" ? "Ready" : status === "working" ? "Focus" : status === "break" ? "Break" : "Paused"}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        {status === "idle" && (
          <button onClick={start} className="bg-gradient-to-r from-accent to-warm text-on-accent font-semibold px-8 py-2.5 rounded-xl hover:shadow-accent transition-all">
            Start
          </button>
        )}
        {(status === "working" || status === "break") && (
          <button onClick={pause} className="bg-card border border-stroke text-heading font-medium px-6 py-2.5 rounded-xl hover:bg-card-hover transition-colors">
            Pause
          </button>
        )}
        {status === "paused" && (
          <>
            <button onClick={start} className="bg-gradient-to-r from-accent to-warm text-on-accent font-semibold px-6 py-2.5 rounded-xl hover:shadow-accent transition-all">
              Resume
            </button>
            <button onClick={reset} className="bg-card border border-stroke text-heading font-medium px-6 py-2.5 rounded-xl hover:bg-card-hover transition-colors">
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
}
