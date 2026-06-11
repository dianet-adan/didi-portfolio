"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  depth?: number;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
  floatDuration?: number;
  floatDistance?: number;
  delay?: number;
}

export default function ParallaxSticker({
  mouseX,
  mouseY,
  depth = 1,
  className,
  style,
  children,
  floatDuration = 4,
  floatDistance = 10,
  delay = 0,
}: Props) {
  const x = useTransform(mouseX, (v) => v * depth);
  const y = useTransform(mouseY, (v) => v * depth);

  return (
    <motion.div className={className} style={{ ...style, x, y }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: [0, -floatDistance, 0] }}
        transition={{
          opacity: { duration: 0.6, delay },
          scale: { duration: 0.6, delay, ease: "backOut" },
          y: {
            duration: floatDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.6,
          },
        }}
        whileHover={{ scale: 1.08, rotate: 0 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
