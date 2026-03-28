import React from "react";
import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";
import ScreenTimeChart from "./ScreenTimeChart";
import SmartQuestions from "./SmartQuestions";

export default function HomePage() {
  const { generateStory, storyLoading, screenTime, focusSessions } = useApp();

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card border border-stroke rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold text-heading">{screenTime.youtube}h</p>
          <p className="text-muted text-[10px] mt-0.5">YouTube</p>
        </div>
        <div className="bg-card border border-stroke rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold text-heading">{screenTime.instagram}h</p>
          <p className="text-muted text-[10px] mt-0.5">Instagram</p>
        </div>
        <div className="bg-card border border-stroke rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold text-heading">{focusSessions}</p>
          <p className="text-muted text-[10px] mt-0.5">Focus</p>
        </div>
      </div>

      {/* Screen Time Chart */}
      <ScreenTimeChart />

      {/* Smart Questions */}
      <SmartQuestions />

      {/* Generate Story Button */}
      <button
        onClick={generateStory}
        disabled={storyLoading}
        className="w-full bg-gradient-to-r from-accent to-warm text-on-accent font-semibold py-4 rounded-2xl transition-all duration-300 hover:shadow-accent hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0 flex items-center justify-center gap-2.5"
      >
        {storyLoading ? (
          <>
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Generating your story...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>Generate My Story</span>
          </>
        )}
      </button>
    </motion.div>
  );
}
