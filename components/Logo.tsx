export default function Logo({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const ring = variant === "light" ? "#dca93a" : "#0a1330";
  const mark = variant === "light" ? "#0a1330" : "#dca93a";
  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 44 44" className="h-full w-full">
        <defs>
          <linearGradient id={`lg-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0d79a" />
            <stop offset="55%" stopColor="#dca93a" />
            <stop offset="100%" stopColor="#a67420" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="42" height="42" rx="13" fill={variant === "light" ? `url(#lg-${variant})` : "#0a1330"} />
        <rect
          x="1"
          y="1"
          width="42"
          height="42"
          rx="13"
          fill="none"
          stroke={variant === "light" ? "rgba(255,255,255,0.25)" : ring}
          strokeWidth="1"
        />
        <path
          d="M15 30V15.5c0-.4.3-.7.7-.7h4.6c2.5 0 4 1.2 4 3.4 0 1.4-.8 2.4-2 2.9 1.6.4 2.6 1.6 2.6 3.3 0 2.4-1.7 3.6-4.4 3.6H15Z"
          fill={variant === "light" ? mark : `url(#lg-${variant})`}
        />
        <path d="M25.5 15h1.9l1.6 4.3 1.6-4.3H33l-2.7 6.6h-1.9L25.5 15Z" fill={variant === "light" ? mark : `url(#lg-${variant})`} opacity="0.85" />
      </svg>
    </span>
  );
}
