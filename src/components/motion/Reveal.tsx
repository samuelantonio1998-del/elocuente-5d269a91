import { ReactNode, useEffect, useRef, useState, CSSProperties } from "react";

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
  /** legacy/no-op — kept for API compatibility */
  margin?: string;
  as?: "div" | "section" | "article" | "li" | "ul";
}

const transformFor = (variant: RevealVariant): string => {
  switch (variant) {
    case "fade":
      return "none";
    case "slide-left":
      return "translate3d(-30px, 0, 0)";
    case "slide-right":
      return "translate3d(30px, 0, 0)";
    case "scale-in":
      return "scale(0.96)";
    case "mask-reveal":
    case "fade-up":
    default:
      return "translate3d(0, 20px, 0)";
  }
};

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const Reveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  variant = "fade-up",
  as = "div",
}: Props) => {
  const ref = useRef<HTMLElement | null>(null);
  /** enabled = JS is in control and we should hide initially */
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      // Fallback: stay visible, no animation
      setEnabled(false);
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    setEnabled(true);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let style: CSSProperties | undefined;
  if (enabled && !visible) {
    style = {
      opacity: 0,
      transform: transformFor(variant),
      willChange: "opacity, transform",
    };
  } else if (enabled && visible) {
    style = {
      opacity: 1,
      transform: "none",
      transition: `opacity ${duration}s ${EASE} ${delay}s, transform ${duration}s ${EASE} ${delay}s`,
    };
  }

  const Tag = as as keyof JSX.IntrinsicElements;
  // @ts-expect-error — generic ref across tags
  return <Tag ref={ref} className={className} style={style}>{children}</Tag>;
};

export default Reveal;
