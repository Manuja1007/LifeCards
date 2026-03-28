import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";
import { getTodayKey, getLast7Days, getDayLabel } from "../../utils/dateUtils";

const moodOptions = [
  { emoji: "😄", label: "Great", value: 5, color: "#10b981" },
  { emoji: "🙂", label: "Good", value: 4, color: "#f59e0b" },
  { emoji: "😐", label: "Okay", value: 3, color: "#06b6d4" },
  { emoji: "😔", label: "Low", value: 2, color: "#f97316" },
  { emoji: "😢", label: "Bad", value: 1, color: "#ef4444" },
];

export default function MoodTracker() {
  const { moods, saveMood } = useApp();
  const today = useMemo(() => getTodayKey(), []);
  const last7 = useMemo(() => getLast7Days(), []);
  const todayMood = moods[today];

  return (
    <div className="bg-card border border-stroke rounded-2xl p-5">
      <h3 className="text-heading font-semibold text-sm mb-4">How are you feeling?</h3>

      <div className="flex justify-between mb-6">
        {moodOptions.map((mood) => (
          <motion.button
            key={mood.value}
            whileTap={{ scale: 0.9 }}
            onClick={() => saveMood(mood.value)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
              todayMood === mood.value
                ? "bg-accent/15 ring-1 ring-accent/40"
                : "hover:bg-card-hover"
            }`}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className="text-[10px] text-muted">{mood.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="flex items-end justify-between gap-1 h-16">
        {last7.map((day) => {
          const moodVal = moods[day];
          const height = moodVal ? (moodVal / 5) * 100 : 10;
          const moodInfo = moodOptions.find((m) => m.value === moodVal);

          return (
            <div key={day} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.5 }}
                className="w-full rounded-t-md"
                style={{
                  backgroundColor: moodInfo ? moodInfo.color : "var(--color-dim)",
                  minHeight: 4,
                }}
              />
              <span className="text-[9px] text-muted">{getDayLabel(day)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
