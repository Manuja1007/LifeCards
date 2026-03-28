import React from "react";
import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";
import { achievementsList } from "../../data/achievements";

export default function AchievementBadges() {
  const { unlockedAchievements } = useApp();

  return (
    <div className="bg-card border border-stroke rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-heading font-semibold text-sm">Achievements</h3>
        <span className="text-muted text-xs">
          {unlockedAchievements.length}/{achievementsList.length}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {achievementsList.map((achievement, i) => {
          const unlocked = unlockedAchievements.includes(achievement.id);

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all ${
                  unlocked ? "shadow-glow" : "opacity-40 grayscale"
                }`}
                style={
                  unlocked
                    ? { background: `linear-gradient(135deg, ${achievement.gradient[0]}, ${achievement.gradient[1]})` }
                    : { background: "var(--color-surface)", border: "1px solid var(--color-stroke)" }
                }
              >
                {achievement.icon}
              </div>
              <span
                className={`text-[9px] font-medium text-center leading-tight ${
                  unlocked ? "text-heading" : "text-dim"
                }`}
              >
                {achievement.title}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
