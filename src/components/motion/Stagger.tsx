import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import type { RevealVariant } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

interface GroupProps {
  children: ReactNode;
  className?: string;
  /** seconds between each child */
  stagger?: number;
  /** initial delay before first child */
  delayChildren?: number;
  margin?: string;
  as?: "div" | "ul" | "ol" | "section" | "tbody";
}

export const StaggerGroup = ({
  children,
  className = "",
  stagger = 0.08,
  delayChildren = 0,
  margin = "-10% 0px",
  as = "div",
}: GroupProps) => {
  const reduce = useReducedMotion() ?? false;
  const variants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delayChildren,
      },
    },
  };
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionTag>
  );
};

interface ItemProps {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  duration?: number;
  as?: "div" | "li" | "tr" | "article" | "section";
}

const itemVariants = (variant: RevealVariant, reduce: boolean): Variants => {
  if (reduce) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.4 } },
    };
  }
  const base = { duration: 0.65, ease: EASE };
  switch (variant) {
    case "scale-in":
      return {
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1, transition: base },
      };
    case "slide-left":
      return {
        hidden: { opacity: 0, x: -30 },
        show: { opacity: 1, x: 0, transition: base },
      };
    case "slide-right":
      return {
        hidden: { opacity: 0, x: 30 },
        show: { opacity: 1, x: 0, transition: base },
      };
    case "mask-reveal":
      return {
        hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
        show: {
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          transition: { duration: 0.9, ease: EASE },
        },
      };
    case "fade":
      return {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: base },
      };
    case "fade-up":
    default:
      return {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: base },
      };
  }
};

export const StaggerItem = ({
  children,
  className = "",
  variant = "fade-up",
  as = "div",
}: ItemProps) => {
  const reduce = useReducedMotion() ?? false;
  const variants = itemVariants(variant, reduce);
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag variants={variants} className={className}>
      {children}
    </MotionTag>
  );
};
