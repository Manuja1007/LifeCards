import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";
import { AVATARS } from "../login/AvatarPicker";

export default function ComicStoryCard({ text, isActive, index, total }) {
  const [displayedText, setDisplayedText] = useState("");
  const [done, setDone] = useState(false);
  const { avatar, name } = useApp();

  // Get user's avatar emoji
  const userAvatar = AVATARS.find((a) => a.id === avatar)?.emoji || "🧑";

  // Comic book character emojis for background narrative
  const characters = ["🧠", "✨", "🎯", "🌟", "💪"];
  const character = characters[index % characters.length];

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
    }, 25);
    return () => clearInterval(interval);
  }, [text, isActive]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, rotateZ: -2 }}
      animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
      exit={{ opacity: 0, scale: 0.95, rotateZ: 2 }}
      transition={{ duration: 0.35, type: "spring", stiffness: 200 }}
      className="relative"
    >
      {/* Comic book panel with double border */}
      <div className="bg-white border-4 border-black rounded-lg p-8 shadow-lg relative overflow-hidden"
        style={{
          boxShadow: "0 0 0 2px #fff, 0 0 0 6px #000, 8px 8px 0px rgba(0,0,0,0.1)"
        }}>
        {/* Comic halftone effect background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #000 30%, transparent 30%)",
            backgroundSize: "4px 4px"
          }}>
        </div>

        {/* Comic panel number top-right */}
        <div className="absolute top-3 right-3 bg-yellow-300 border-2 border-black rounded px-2 py-0.5">
          <span className="text-xs font-black text-black">{index + 1}</span>
        </div>

        {/* Character avatar left side */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="absolute -left-3 top-1/2 -translate-y-1/2 text-5xl bg-white border-4 border-black rounded-full w-20 h-20 flex items-center justify-center shadow-md relative"
        >
          {userAvatar}
          {/* Small glow effect around avatar */}
          <div className="absolute inset-0 border-4 border-accent/30 rounded-full animate-pulse"></div>
        </motion.div>

        {/* Main content - speech bubble effect */}
        <div className="ml-12 relative">
          {/* Speech bubble tail */}
          <div className="absolute -left-3 top-6 w-6 h-6 bg-white border-l-4 border-b-4 border-black transform -rotate-45"></div>

          {/* Speech bubble content */}
          <div className="bg-yellow-50 border-3 border-black rounded-lg p-5 relative">
            {/* Comic effect lines around bubble */}
            <div className="absolute inset-0 border-2 border-black/30 rounded-lg pointer-events-none" style={{ transform: "translate(2px, 2px)" }}></div>

            <p className="text-body text-base font-bold leading-relaxed relative z-10 text-center">
              {displayedText}
              {!done && (
                <span className="inline-block w-1 h-5 bg-black ml-1 animate-pulse"></span>
              )}
            </p>
          </div>

          {/* Action words styling */}
          {done && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
              className="absolute -top-4 -right-4 text-lg font-black transform -rotate-12"
              style={{ color: "#FF1493", textShadow: "2px 2px 0px black" }}
            >
              ✨
            </motion.div>
          )}
        </div>
      </div>

      {/* Comic book style progress indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center mt-6 gap-3"
      >
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            animate={i === index ? { scale: 1.3, rotate: 360 } : { scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`w-3 h-3 border-2 border-black transition-colors ${
              i === index ? "bg-accent" : i < index ? "bg-black" : "bg-white"
            }`}
          ></motion.div>
        ))}
      </motion.div>

      {/* Comic book caption at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 px-2 space-y-2"
      >
        <div className="bg-yellow-300 border-2 border-black p-2 text-center">
          <p className="text-xs font-black text-black">
            PANEL {index + 1} OF {total}
          </p>
        </div>
        <div className="bg-accent/20 border-2 border-accent rounded-lg p-2 text-center">
          <p className="text-xs font-bold text-heading">
            {userAvatar} {name}'s Story
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
