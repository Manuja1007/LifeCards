import React, { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";
import AvatarPicker from "./AvatarPicker";

export default function LoginScreen() {
  const { login } = useApp();
  const [inputName, setInputName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("boy1");

  const startApp = () => {
    if (!inputName.trim()) return;
    login(inputName.trim(), selectedAvatar);
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-warm/15 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="bg-card/60 backdrop-blur-2xl border border-stroke rounded-2xl p-8 shadow-card">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-accent to-warm rounded-2xl flex items-center justify-center shadow-glow">
              <svg className="w-7 h-7 text-on-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-heading text-center mb-1 tracking-tight">
            LifeCards
          </h1>
          <p className="text-muted text-sm text-center mb-8">
            Turn awareness into growth
          </p>

          <div className="space-y-4">
            <input
              className="w-full bg-surface border border-stroke rounded-xl px-4 py-3.5 text-heading text-sm placeholder:text-muted focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-all"
              placeholder="What's your name?"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && startApp()}
            />
            <AvatarPicker selectedAvatar={selectedAvatar} onSelect={setSelectedAvatar} />
            <button
              onClick={startApp}
              disabled={!inputName.trim()}
              className="w-full bg-gradient-to-r from-accent to-warm text-on-accent font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-accent hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
            >
              Get Started
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
