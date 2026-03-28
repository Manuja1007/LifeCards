import React from "react";
import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";

const appColors = {
  youtube: { label: "YouTube", color: "#ef4444" },
  instagram: { label: "Instagram", color: "#ec4899" },
  vscode: { label: "VS Code", color: "#06b6d4" },
  whatsapp: { label: "WhatsApp", color: "#10b981" },
};

export default function ScreenTimeChart() {
  const { screenTime, screenTimeTotal } = useApp();
  const maxHours = Math.max(...Object.values(screenTime), 1);

  return (
    <div className="bg-card border border-stroke rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-heading font-semibold text-sm">Today's Screen Time</h3>
        <span className="text-accent text-xs font-medium">{screenTimeTotal.toFixed(1)}h total</span>
      </div>

      <div className="space-y-3">
        {Object.entries(screenTime).map(([app, hours], i) => {
          const info = appColors[app];
          const pct = (hours / maxHours) * 100;

          return (
            <motion.div
              key={app}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-body text-xs">{info.label}</span>
                <span className="text-heading text-xs font-medium">{hours}h</span>
              </div>
              <div className="h-2 bg-surface rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: info.color }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
