import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function StoryCard({ text, isActive }) {
  const [displayedText, setDisplayedText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isActive || !text) {
      setDisplayedText(text || "");
      setDone(true);
      return;
    }
    setDisplayedText("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text, isActive]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.25 }}
      className="bg-gradient-to-br from-card to-elevated border border-stroke rounded-2xl p-8 min-h-[220px] flex items-center justify-center shadow-card relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
      <p className="text-heading text-lg text-center font-medium leading-relaxed relative z-10">
        {displayedText}
        {!done && <span className="inline-block w-0.5 h-5 bg-accent ml-0.5 animate-pulse" />}
      </p>
    </motion.div>
  );
}
