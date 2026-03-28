import React, { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { getTodayKey, getYesterdayKey } from "../../utils/dateUtils";

export default function ReflectionSection() {
  const { reflections, saveReflection } = useApp();
  const [text, setText] = useState("");
  const today = useMemo(() => getTodayKey(), []);
  const yesterday = useMemo(() => getYesterdayKey(), []);
  const todayReflection = reflections[today];
  const yesterdayReflection = reflections[yesterday];

  const handleSave = () => {
    if (!text.trim()) return;
    saveReflection(text.trim());
    setText("");
  };

  return (
    <div className="space-y-4">
      {yesterdayReflection && (
        <div className="bg-card border border-stroke rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-accent/15 rounded-lg flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-accent-soft" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
              </svg>
            </div>
            <span className="text-muted text-xs font-medium">Yesterday's Reflection</span>
          </div>
          <p className="text-heading text-sm leading-relaxed">{yesterdayReflection}</p>
        </div>
      )}

      {todayReflection ? (
        <div className="bg-card border border-stroke rounded-2xl p-5">
          <p className="text-heading font-semibold text-sm mb-2">Today's Reflection</p>
          <p className="text-body text-sm leading-relaxed">{todayReflection}</p>
        </div>
      ) : (
        <div className="bg-card border border-stroke rounded-2xl p-5 space-y-4">
          <p className="text-heading font-semibold text-sm">Today's Reflection</p>
          <textarea
            className="w-full bg-surface border border-stroke rounded-xl px-4 py-3 text-heading text-sm placeholder:text-muted resize-none h-28 focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-all"
            placeholder="One win &#8226; One mistake &#8226; One improvement"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={handleSave}
            disabled={!text.trim()}
            className="w-full bg-gradient-to-r from-accent to-accent-soft text-on-accent font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-accent hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
          >
            Save Reflection
          </button>
        </div>
      )}
    </div>
  );
}
