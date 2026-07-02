import { ReactNode } from "react";

/**
 * Desktop-only sticky "stage" wrapper.
 *
 * Uses pure CSS position:sticky — never traps the user, never hijacks the wheel.
 * On mobile/tablet (<lg), it collapses to a normal block: no sticky, no extra height.
 * On desktop, the child sticks near the top of the viewport for the duration of
 * the outer container's scroll length, creating a subtle "the image settles" moment.
 *
 * Safety:
 *  - No JS scroll listeners.
 *  - No preventDefault on wheel/keys — Tab/PageDown/anchors all work.
 *  - Respects prefers-reduced-motion via CSS below (sticky itself is not animation,
 *    but we keep the outer height only on desktop with motion enabled).
 */
type Props = {
  children: ReactNode;
  className?: string;
};

const StickyStage = ({ children, className = "" }: Props) => {
  return (
    <div className={`sticky-stage ${className}`}>
      <div className="sticky-stage__inner">{children}</div>
    </div>
  );
};

export default StickyStage;
