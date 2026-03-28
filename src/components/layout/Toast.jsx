import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../context/AppContext";

export default function Toast() {
  const { toast } = useApp();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-emerald text-on-accent text-sm font-medium px-5 py-2.5 rounded-xl shadow-card z-30"
        >
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
