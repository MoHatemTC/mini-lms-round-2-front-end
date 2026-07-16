import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Confetti({ active, duration = 3000, particleCount = 50 }) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (active) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), duration);
      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  if (!isAnimating) return null;

  const colors = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      <AnimatePresence>
        {isAnimating &&
          Array.from({ length: particleCount }).map((_, i) => {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 10 + 5;
            const initialX = Math.random() * 100;
            const finalX = initialX + (Math.random() * 20 - 10);
            const delay = Math.random() * 0.2;
            return (
              <motion.div
                key={i}
                initial={{
                  top: "-5%",
                  left: `${initialX}%`,
                  scale: 0,
                  rotate: 0,
                  opacity: 1,
                }}
                animate={{
                  top: "105%",
                  left: `${finalX}%`,
                  scale: [0, 1, 1, 0.5],
                  rotate: Math.random() * 720 - 360,
                  opacity: [1, 1, 0.8, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: duration / 1000,
                  ease: "easeOut",
                  delay,
                }}
                style={{
                  position: "absolute",
                  width: size,
                  height: size * (Math.random() > 0.5 ? 1 : 2),
                  backgroundColor: color,
                  borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                }}
              />
            );
          })}
      </AnimatePresence>
    </div>
  );
}
