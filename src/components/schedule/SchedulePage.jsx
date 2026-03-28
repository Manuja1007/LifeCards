import React, { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";
import TimetableBuilder from "./TimetableBuilder";
import FocusTimer from "./FocusTimer";
import ProductivitySuggestions from "../home/ProductivitySuggestions";

export default function SchedulePage() {
  const [activeTab, setActiveTab] = useState("timetable");
  const { productivitySuggestions } = useApp();

  return (
    <motion.div
      key="schedule"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex gap-2">
        {[
          { id: "timetable", label: "Timetable" },
          { id: "focus", label: "Focus Timer" },
          { id: "analytics", label: "Analytics" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === tab.id
                ? "bg-accent text-on-accent"
                : "bg-card border border-stroke text-body hover:bg-card-hover"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "timetable" ? (
        <TimetableBuilder />
      ) : activeTab === "focus" ? (
        <FocusTimer />
      ) : (
        <ProductivitySuggestions suggestions={productivitySuggestions} />
      )}
    </motion.div>
  );
}
