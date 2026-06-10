import { ReactNode } from "react";
import Reveal, { type RevealVariant } from "./motion/Reveal";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}

/** Backwards-compatible wrapper around the new Reveal primitive. */
const AnimatedSection = ({ children, className, delay, variant }: Props) => (
  <Reveal className={className} delay={delay} variant={variant}>
    {children}
  </Reveal>
);

export default AnimatedSection;
