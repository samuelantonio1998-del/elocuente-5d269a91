import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ElementType } from "react";

interface Props {
  text: string;
  className?: string;
  as?: ElementType;
  delay?: number;
  stagger?: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const container = (delay: number, stagger: number): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

const word: Variants = {
  hidden: { opacity: 0, y: "0.6em" },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

const SplitText = ({
  text,
  className = "",
  as: Tag = "h1",
  delay = 0,
  stagger = 0.06,
}: Props) => {
  const reduce = useReducedMotion() ?? false;
  const words = text.split(" ");
  const MotionTag = motion(Tag as ElementType);

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate="show"
      variants={container(delay, stagger)}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-baseline"
          style={{ paddingBottom: "0.05em" }}
        >
          <motion.span
            variants={word}
            className="inline-block will-change-transform"
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};

export default SplitText;
