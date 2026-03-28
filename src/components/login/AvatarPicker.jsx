import React from "react";
import { motion } from "framer-motion";

const AVATARS = [
  { id: "boy1", emoji: "👨", label: "Man" },
  { id: "girl1", emoji: "👩", label: "Woman" },
  { id: "boy2", emoji: "🧑", label: "Person" },
  { id: "student", emoji: "🧑‍🎓", label: "Student" },
  { id: "developer", emoji: "🧑‍💻", label: "Developer" },
  { id: "artist", emoji: "🧑‍🎨", label: "Artist" },
  { id: "superhero", emoji: "🦸", label: "Superhero" },
  { id: "cool", emoji: "😎", label: "Cool Kid" },
];

export default function AvatarPicker({ selectedAvatar, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-3"
    >
      <label className="block text-sm font-semibold text-heading">
        Choose your avatar
      </label>
      <div className="grid grid-cols-4 gap-2">
        {AVATARS.map((avatar) => (
          <motion.button
            key={avatar.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(avatar.id)}
            className={`aspect-square rounded-xl flex flex-col items-center justify-center text-2xl transition-all border-2 ${
              selectedAvatar === avatar.id
                ? "border-accent bg-accent/10 ring-2 ring-accent"
                : "border-stroke bg-surface hover:border-accent/50 hover:bg-card-hover"
            }`}
            title={avatar.label}
          >
            <span>{avatar.emoji}</span>
            <span className="text-xs font-bold text-muted mt-1">{avatar.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export { AVATARS };
