import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  children: ReactNode;
  /** Total vertical travel in px across the section pass (±range/2 around center). */
  range?: number;
  className?: string;
}

/**
 * Absolute-fill wrapper that translates its children on scroll for a subtle
 * parallax. Container must have overflow-hidden. Children fill via inset-0.
 *
 * - transform-only (GPU), no layout thrash
 * - disabled on prefers-reduced-motion and on small screens (<768px)
 * - scale >1 to hide edge exposure when translating
 */
const ParallaxImages = ({ children, range = 50, className = "" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const disabled = reduce || isMobile;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    disabled ? [0, 0] : [range / 2, -range / 2]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        scale: disabled ? 1 : 1.08,
        willChange: "transform",
      }}
      className={`absolute inset-0 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxImages;
