import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";
import { getTodayKey, formatHour } from "../../utils/dateUtils";

const hours = Array.from({ length: 16 }, (_, i) => i + 6);

export default function TimetableBuilder() {
  const { timetable, saveTimetableEntry, removeTimetableEntry, showToast } = useApp();
  const today = useMemo(() => getTodayKey(), []);
  const todayEntries = timetable[today] || {};
  const [editingHour, setEditingHour] = useState(null);
  const [taskInput, setTaskInput] = useState("");

  const handleSave = (hour) => {
    if (!taskInput.trim()) return;
    saveTimetableEntry(today, hour, taskInput.trim());
    setTaskInput("");
    setEditingHour(null);
    showToast("Task added!");
  };

  const handleRemove = (hour) => {
    removeTimetableEntry(today, hour);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-heading font-semibold text-sm">Today's Schedule</h3>
        <span className="text-muted text-xs">{Object.keys(todayEntries).length} tasks</span>
      </div>

      <div className="space-y-1.5">
        {hours.map((hour) => {
          const task = todayEntries[hour];
          const isEditing = editingHour === hour;

          return (
            <motion.div
              key={hour}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <span className="text-muted text-[11px] w-14 text-right font-mono shrink-0">
                {formatHour(hour)}
              </span>

              {isEditing ? (
                <div className="flex-1 flex gap-2">
                  <input
                    autoFocus
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSave(hour);
                      if (e.key === "Escape") { setEditingHour(null); setTaskInput(""); }
                    }}
                    className="flex-1 bg-surface border border-accent/40 rounded-lg px-3 py-1.5 text-heading text-xs focus:outline-none focus:ring-1 focus:ring-accent/30"
                    placeholder="What's planned?"
                  />
                  <button
                    onClick={() => handleSave(hour)}
                    className="text-accent text-xs font-medium px-2"
                  >
                    Save
                  </button>
                </div>
              ) : task ? (
                <div className="flex-1 bg-card border border-stroke rounded-lg px-3 py-2 flex items-center justify-between group">
                  <span className="text-heading text-xs">{task}</span>
                  <button
                    onClick={() => handleRemove(hour)}
                    className="text-muted hover:text-red opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setEditingHour(hour); setTaskInput(""); }}
                  className="flex-1 border border-dashed border-dim rounded-lg px-3 py-2 text-dim text-xs text-left hover:border-muted hover:text-muted transition-colors"
                >
                  + Add task
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
