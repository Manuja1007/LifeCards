import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../context/AppContext";
import { smartQuestions } from "../../data/smartQuestions";

export default function SmartQuestions() {
  const { answers, saveAnswer } = useApp();

  const unanswered = smartQuestions.filter((q) => !answers[q.id]);
  if (unanswered.length === 0) return null;

  const current = unanswered[0];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-card border border-stroke rounded-2xl p-5"
      >
        <p className="text-heading font-medium text-sm mb-4">{current.question}</p>
        <div className="grid grid-cols-3 gap-2">
          {current.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => saveAnswer(current.id, opt.value)}
              className="bg-surface border border-stroke rounded-xl p-3 flex flex-col items-center gap-1.5 hover:border-accent/50 hover:bg-card-hover transition-all"
            >
              <span className="text-lg">{opt.emoji}</span>
              <span className="text-body text-[11px] font-medium text-center">{opt.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
