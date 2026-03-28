import React from "react";
import { motion } from "framer-motion";
import ReflectionSection from "./ReflectionSection";
import MoodTracker from "./MoodTracker";
import AchievementBadges from "./AchievementBadges";

export default function MePage() {
  return (
    <motion.div
      key="me"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <MoodTracker />
      <ReflectionSection />
      <AchievementBadges />
    </motion.div>
  );
}
