import {
  Children,
  cloneElement,
  CSSProperties,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import type { RevealVariant } from "./Reveal";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const transformFor = (variant: RevealVariant): string => {
  switch (variant) {
    case "fade":
      return "none";
    case "slide-left":
      return "translate3d(-24px, 0, 0)";
    case "slide-right":
      return "translate3d(24px, 0, 0)";
    case "scale-in":
      return "scale(0.95)";
    case "mask-reveal":
    case "fade-up":
    default:
      return "translate3d(0, 18px, 0)";
  }
};

interface GroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  margin?: string;
  as?: "div" | "ul" | "ol" | "section" | "tbody";
}

export const StaggerGroup = ({
  children,
  className = "",
  stagger = 0.08,
  delayChildren = 0,
  as = "div",
}: GroupProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
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

  const items = Children.toArray(children);
  const decorated = items.map((child, i) => {
    if (!isValidElement(child)) return child;
    return cloneElement(child as React.ReactElement<any>, {
      __staggerEnabled: enabled,
      __staggerVisible: visible,
      __staggerDelay: delayChildren + stagger * i,
    });
  });

  const Tag = as as keyof JSX.IntrinsicElements;
  // @ts-expect-error — generic ref across tags
  return <Tag ref={ref} className={className}>{decorated}</Tag>;
};

interface ItemProps {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  duration?: number;
  as?: "div" | "li" | "tr" | "article" | "section";
  // injected by StaggerGroup
  __staggerEnabled?: boolean;
  __staggerVisible?: boolean;
  __staggerDelay?: number;
}

export const StaggerItem = ({
  children,
  className = "",
  variant = "fade-up",
  duration = 0.65,
  as = "div",
  __staggerEnabled = false,
  __staggerVisible = true,
  __staggerDelay = 0,
}: ItemProps) => {
  let style: CSSProperties | undefined;
  if (__staggerEnabled && !__staggerVisible) {
    style = {
      opacity: 0,
      transform: transformFor(variant),
      willChange: "opacity, transform",
    };
  } else if (__staggerEnabled && __staggerVisible) {
    style = {
      opacity: 1,
      transform: "none",
      transition: `opacity ${duration}s ${EASE} ${__staggerDelay}s, transform ${duration}s ${EASE} ${__staggerDelay}s`,
    };
  }

  const Tag = as as keyof JSX.IntrinsicElements;
  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  );
};
