interface LogoProps {
  className?: string;
  /** Height in pixels (width scales automatically). */
  height?: number;
  title?: string;
}

/**
 * ELOCUENTE wordmark — geometric light sans-serif with the three "E" letters
 * rendered as three horizontal bars (no vertical stem), matching the brand
 * "Conceito C" identity.
 *
 * Color is inherited via `currentColor` so it adapts to text color utilities.
 */
const Logo = ({ className = "", height = 28, title = "Elocuente" }: LogoProps) => {
  // ViewBox tuned so the wordmark sits on a 60-unit-tall baseline grid.
  return (
    <svg
      viewBox="0 0 520 60"
      height={height}
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="square">
        {/* E — three horizontal bars, no vertical stem */}
        <line x1="2"   y1="10" x2="32"  y2="10" />
        <line x1="2"   y1="30" x2="26"  y2="30" />
        <line x1="2"   y1="50" x2="32"  y2="50" />

        {/* L */}
        <line x1="52"  y1="10" x2="52"  y2="50" />
        <line x1="52"  y1="50" x2="80"  y2="50" />

        {/* O */}
        <ellipse cx="115" cy="30" rx="20" ry="20" />

        {/* C */}
        <path d="M 178 14 A 20 20 0 1 0 178 46" />

        {/* U */}
        <path d="M 213 10 L 213 36 A 16 16 0 0 0 245 36 L 245 10" />

        {/* E */}
        <line x1="270" y1="10" x2="300" y2="10" />
        <line x1="270" y1="30" x2="294" y2="30" />
        <line x1="270" y1="50" x2="300" y2="50" />

        {/* N */}
        <line x1="320" y1="50" x2="320" y2="10" />
        <line x1="320" y1="10" x2="356" y2="50" />
        <line x1="356" y1="50" x2="356" y2="10" />

        {/* T */}
        <line x1="376" y1="10" x2="416" y2="10" />
        <line x1="396" y1="10" x2="396" y2="50" />

        {/* E */}
        <line x1="436" y1="10" x2="466" y2="10" />
        <line x1="436" y1="30" x2="460" y2="30" />
        <line x1="436" y1="50" x2="466" y2="50" />
      </g>
    </svg>
  );
};

export default Logo;
