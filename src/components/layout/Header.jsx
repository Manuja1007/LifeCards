import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../context/AppContext";

export default function Header() {
  const { name, logout, avatar } = useApp();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      setShowLogout(false);
    }
  };

  return (
    <header className="relative z-10 px-5 pt-6 pb-4 max-w-md mx-auto w-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted text-xs font-medium mb-0.5">Welcome back</p>
          <h1 className="text-heading font-bold text-xl tracking-tight">{name}</h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Logout button */}
          <motion.div className="relative">
            <button
              onClick={() => setShowLogout(!showLogout)}
              className="w-10 h-10 bg-card border border-stroke rounded-full flex items-center justify-center text-muted hover:text-heading transition-colors hover:border-accent"
              title="More options"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>

            {/* Logout dropdown */}
            <AnimatePresence>
              {showLogout && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 bg-card border border-stroke rounded-xl shadow-lg z-50"
                >
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* User avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-warm rounded-full flex items-center justify-center text-on-accent font-bold text-lg shadow-glow">
            {avatar ? "🧑" : name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
