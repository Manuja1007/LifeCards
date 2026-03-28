import React, { useState } from "react";
import { motion } from "framer-motion";
import { videoLibrary, categories } from "../../data/videoLibrary";
import VideoCard from "./VideoCard";

export default function GrowthPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? videoLibrary
      : videoLibrary.filter((v) => v.category === activeCategory);

  return (
    <motion.div
      key="growth"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? "bg-accent text-on-accent"
                : "bg-card border border-stroke text-body hover:bg-card-hover"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </motion.div>
  );
}
