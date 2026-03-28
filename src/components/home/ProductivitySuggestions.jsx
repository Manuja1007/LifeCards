import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../context/AppContext";
import { analyzeBehavior, getHealthStatusMessage } from "../../services/behaviorAnalysisService";
import { getTodayKey } from "../../utils/dateUtils";

export default function ProductivitySuggestions({ suggestions = [] }) {
  const { screenTime, focusSessions, moods, setPage, generateStory } = useApp();
  const [expandedId, setExpandedId] = useState(null);

  const moodValue = moods[getTodayKey()];
  const insights = analyzeBehavior(screenTime, focusSessions, moods, moodValue);
  const healthStatus = getHealthStatusMessage(insights.overallHealth);

  const handleAction = (suggestion) => {
    if (suggestion.id === "mood-boost") setPage("me");
    if (suggestion.id === "celebrate" || suggestion.id === "productive-day") setPage("me");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Health Status Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`bg-gradient-to-br rounded-2xl p-5 border-2 ${
          insights.overallHealth === "excellent"
            ? "from-green-100 to-emerald-50 border-green-300 text-green-900"
            : insights.overallHealth === "good"
            ? "from-blue-100 to-cyan-50 border-blue-300 text-blue-900"
            : insights.overallHealth === "fair"
            ? "from-yellow-100 to-amber-50 border-yellow-300 text-amber-900"
            : "from-orange-100 to-red-50 border-orange-300 text-orange-900"
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-2xl font-black">{healthStatus.emoji}</p>
            <h3 className="font-black text-lg mt-1">{healthStatus.title}</h3>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black">{Math.round((insights.focusScore / (insights.focusScore + insights.distractionScore)) * 100) || 0}%</div>
            <p className="text-xs font-bold opacity-75">Focused</p>
          </div>
        </div>
        <p className="text-sm font-semibold opacity-90">{healthStatus.message}</p>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t-2 border-current opacity-75">
          <div className="text-center">
            <p className="text-lg font-black">{insights.focusSessions}</p>
            <p className="text-xs font-bold">Focus</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black">{insights.distractionScore}</p>
            <p className="text-xs font-bold">Distract</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black">{Math.round(insights.focusPercentage)}%</p>
            <p className="text-xs font-bold">Prod</p>
          </div>
        </div>
      </motion.div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="space-y-2"
        >
          <h3 className="text-sm font-black text-muted uppercase tracking-wider px-1">Your Actions Today</h3>
          <AnimatePresence>
            {suggestions.map((suggestion, idx) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <button
                  onClick={() => setExpandedId(expandedId === suggestion.id ? null : suggestion.id)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                    expandedId === suggestion.id
                      ? "bg-accent/10 border-accent"
                      : "bg-card border-stroke hover:border-accent hover:bg-card-hover"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{suggestion.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-heading text-sm">{suggestion.title}</h4>
                        {suggestion.priority === "high" && (
                          <span className="text-xs font-black bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                            Priority
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted line-clamp-1">{suggestion.description}</p>
                    </div>
                    <motion.div animate={{ rotate: expandedId === suggestion.id ? 180 : 0 }}>
                      <svg
                        className="w-4 h-4 text-muted flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </motion.div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {expandedId === suggestion.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 pt-3 border-t border-stroke"
                      >
                        <p className="text-xs text-body leading-relaxed mb-3">{suggestion.description}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction(suggestion);
                            setExpandedId(null);
                          }}
                          className="w-full bg-accent text-on-accent text-xs font-bold py-2 rounded-lg hover:shadow-accent transition-all"
                        >
                          {suggestion.action}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Behavior Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="bg-card border border-stroke rounded-2xl p-4"
      >
        <h3 className="text-xs font-black text-muted uppercase tracking-wider mb-4">Your Focus Balance</h3>

        {/* Stacked bar chart */}
        <div className="space-y-2">
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-bold text-heading">Screen Time Distribution</p>
              <p className="text-xs text-muted">{insights.totalScreenTime.toFixed(1)}h</p>
            </div>
            <div className="flex h-6 rounded-lg overflow-hidden border-2 border-stroke">
              {insights.productiveHours > 0 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(insights.productiveHours / Math.max(1, insights.totalScreenTime)) * 100}%` }}
                  className="bg-green-500 flex items-center justify-center"
                  title={`Productive: ${insights.productiveHours}h`}
                >
                  {(insights.productiveHours / Math.max(1, insights.totalScreenTime)) * 100 > 15 && (
                    <span className="text-white text-xs font-bold">Pro</span>
                  )}
                </motion.div>
              )}
              {insights.distractionHours > 0 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(insights.distractionHours / Math.max(1, insights.totalScreenTime)) * 100}%` }}
                  className="bg-red-500 flex items-center justify-center"
                  title={`Distraction: ${insights.distractionHours}h`}
                >
                  {(insights.distractionHours / Math.max(1, insights.totalScreenTime)) * 100 > 15 && (
                    <span className="text-white text-xs font-bold">Dist</span>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* Score indicators */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-2">
              <p className="text-xs text-green-700 font-bold">Focus Score</p>
              <p className="text-lg font-black text-green-600">{insights.focusScore}</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-2">
              <p className="text-xs text-red-700 font-bold">Distraction</p>
              <p className="text-lg font-black text-red-600">{insights.distractionScore}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
