import React, { useState } from "react";
import { motion } from "framer-motion";

export default function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-stroke rounded-2xl overflow-hidden"
    >
      {playing ? (
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-presentation"
          />
        </div>
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="relative w-full block"
          style={{ paddingBottom: "56.25%" }}
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-colors flex items-center justify-center">
            <div className="w-14 h-14 bg-accent/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-on-accent ml-1" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>
        </button>
      )}

      <div className="p-4">
        <p className="text-heading text-sm font-medium leading-snug">{video.title}</p>
        <p className="text-muted text-xs mt-1">{video.channel}</p>
      </div>
    </motion.div>
  );
}
