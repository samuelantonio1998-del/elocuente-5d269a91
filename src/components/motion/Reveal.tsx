import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";

export type RevealVariant =
  | "fade-up"
  | "fade"
  | "slide-left"
  | "slide-right"
  | "mask-reveal"
  | "scale-in";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: RevealVariant;
  /** viewport margin override */
  margin?: string;
  as?: "div" | "section" | "article" | "li" | "ul";
}

const EASE = [0.22, 1, 0.36, 1] as const;

const buildVariants = (variant: RevealVariant, reduce: boolean): Variants => {
  if (reduce) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1 },
    };
  }
  switch (variant) {
    case "fade":
      return { hidden: { opacity: 0 }, show: { opacity: 1 } };
    case "slide-left":
      return {
        hidden: { opacity: 0, x: -40 },
        show: { opacity: 1, x: 0 },
      };
    case "slide-right":
      return {
        hidden: { opacity: 0, x: 40 },
        show: { opacity: 1, x: 0 },
      };
    case "scale-in":
      return {
        hidden: { opacity: 0, scale: 0.92 },
        show: { opacity: 1, scale: 1 },
      };
    case "mask-reveal":
      return {
        hidden: {
          opacity: 0,
          clipPath: "inset(0 0 100% 0)",
        },
        show: {
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
        },
      };
    case "fade-up":
    default:
      return {
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0 },
      };
  }
};

const Reveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.75,
  variant = "fade-up",
  margin = "-12% 0px",
  as = "div",
}: Props) => {
  const reduce = useReducedMotion() ?? false;
  const variants = buildVariants(variant, reduce);
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin }}
      variants={variants}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
