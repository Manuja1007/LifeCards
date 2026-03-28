import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../../context/AppContext";
import ComicStoryCard from "./ComicStoryCard";

export default function StoryPage() {
  const { story, storyIndex, setStoryIndex, setPage } = useApp();
  const touchStartX = useRef(0);

  const next = () => storyIndex < story.length - 1 && setStoryIndex(storyIndex + 1);
  const prev = () => storyIndex > 0 && setStoryIndex(storyIndex - 1);

  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
  };

  if (story.length === 0) {
    return (
      <motion.div
        key="story-empty"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center py-20 space-y-4"
      >
        <div className="w-16 h-16 bg-card border border-stroke rounded-2xl flex items-center justify-center">
          <svg className="w-8 h-8 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
          </svg>
        </div>
        <p className="text-muted text-sm">No story yet</p>
        <button
          onClick={() => setPage("home")}
          className="text-accent text-sm font-medium hover:underline"
        >
          Go to Home to generate one
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="story"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <AnimatePresence mode="wait">
          <ComicStoryCard 
            key={storyIndex} 
            text={story[storyIndex]} 
            isActive={true}
            index={storyIndex}
            total={story.length}
          />
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between px-2">
        <button
          onClick={prev}
          disabled={storyIndex === 0}
          className="w-10 h-10 bg-card border border-stroke rounded-xl flex items-center justify-center text-body disabled:opacity-30 hover:bg-card-hover transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex gap-1.5">
          {story.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i === storyIndex ? 24 : 8 }}
              className={`h-2 rounded-full transition-colors duration-200 ${
                i === storyIndex ? "bg-accent" : "bg-dim"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={storyIndex === story.length - 1}
          className="w-10 h-10 bg-card border border-stroke rounded-xl flex items-center justify-center text-body disabled:opacity-30 hover:bg-card-hover transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
