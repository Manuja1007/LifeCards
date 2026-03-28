import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../context/AppContext";
import { formatHour } from "../../utils/dateUtils";

export default function DailyCheckIn() {
  const { showCheckIn, dismissCheckIn, yesterdayTimetable, checkedItems, toggleCheckedItem, yesterdayKey, showToast } = useApp();
  const dayChecks = checkedItems[yesterdayKey] || {};

  const handleDone = () => {
    showToast("Great job checking in!");
    dismissCheckIn();
  };

  return (
    <AnimatePresence>
      {showCheckIn && Object.keys(yesterdayTimetable).length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-card border border-stroke rounded-2xl p-6 w-full max-w-sm max-h-[80vh] overflow-y-auto"
          >
            <h2 className="text-heading font-bold text-lg mb-1">Daily Check-in</h2>
            <p className="text-muted text-xs mb-5">Tick what you completed yesterday</p>

            <div className="space-y-2 mb-6">
              {Object.entries(yesterdayTimetable)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([hour, task]) => (
                  <button
                    key={hour}
                    onClick={() => toggleCheckedItem(hour)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      dayChecks[hour]
                        ? "bg-emerald/10 border-emerald/30"
                        : "bg-surface border-stroke hover:border-muted"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                        dayChecks[hour] ? "bg-emerald border-emerald" : "border-dim"
                      }`}
                    >
                      {dayChecks[hour] && (
                        <svg className="w-3 h-3 text-on-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <div className="text-left">
                      <p className={`text-xs font-medium ${dayChecks[hour] ? "text-emerald line-through" : "text-heading"}`}>
                        {task}
                      </p>
                      <p className="text-muted text-[10px]">{formatHour(Number(hour))}</p>
                    </div>
                  </button>
                ))}
            </div>

            <button
              onClick={handleDone}
              className="w-full bg-gradient-to-r from-accent to-warm text-on-accent font-semibold py-3 rounded-xl hover:shadow-accent transition-all"
            >
              Done
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
