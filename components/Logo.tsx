export default function Logo({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 44 44" className="h-full w-full">
        {/* Outer ring */}
        <circle cx="22" cy="22" r="21" fill="#0a0c10" />
        <circle cx="22" cy="22" r="21" fill="none" stroke="#1c69d4" strokeWidth="1" opacity="0.5" />
        {/* Inner white field */}
        <circle cx="22" cy="22" r="15.5" fill="#ffffff" />
        {/* Blue quadrants (top-left + bottom-right) — roundel motif */}
        <path d="M22 22 L22 6.5 A15.5 15.5 0 0 0 6.5 22 Z" fill="#0f57c0" />
        <path d="M22 22 L22 37.5 A15.5 15.5 0 0 0 37.5 22 Z" fill="#0f57c0" />
        {/* Center hub with a subtle roof mark (realtor cue) */}
        <circle cx="22" cy="22" r="6.4" fill="#0a0c10" />
        <path
          d="M17.6 23.2 L22 19.4 L26.4 23.2"
          fill="none"
          stroke="#4ea3e0"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
