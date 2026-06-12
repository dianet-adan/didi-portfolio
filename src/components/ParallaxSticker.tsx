"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { ReactNode, RefObject } from "react";

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
  dragConstraints?: RefObject<Element | null>;
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
  dragConstraints,
}: Props) {
  const x = useTransform(mouseX, (v) => v * depth);
  const y = useTransform(mouseY, (v) => v * depth);

  return (
    <motion.div className={className} style={{ ...style, x, y }}>
      {/* drag layer: separate from the float loop so dropped positions stick */}
      <motion.div
        drag={Boolean(dragConstraints)}
        dragConstraints={dragConstraints}
        dragElastic={0.18}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 22, power: 0.3 }}
        whileDrag={{ scale: 1.08, zIndex: 50, cursor: "grabbing" }}
        className={dragConstraints ? "cursor-grab active:cursor-grabbing" : undefined}
      >
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
    </motion.div>
  );
}
