export default function Logo({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 44 44" className="h-full w-full">
        <defs>
          <linearGradient id="lg-em" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#10633f" />
            <stop offset="55%" stopColor="#157a4d" />
            <stop offset="100%" stopColor="#63b98c" />
          </linearGradient>
        </defs>
        {/* Warm charcoal tile */}
        <rect x="1" y="1" width="42" height="42" rx="11" fill="#232220" />
        <rect x="1" y="1" width="42" height="42" rx="11" fill="none" stroke="url(#lg-em)" strokeWidth="1.2" opacity="0.9" />
        {/* Ascending wealth bars */}
        <rect x="11" y="24" width="5.5" height="9" rx="1.4" fill="url(#lg-em)" opacity="0.7" />
        <rect x="19.25" y="18" width="5.5" height="15" rx="1.4" fill="url(#lg-em)" opacity="0.85" />
        <rect x="27.5" y="12" width="5.5" height="21" rx="1.4" fill="url(#lg-em)" />
        {/* Growth arrow */}
        <path
          d="M12 20.5 L20 15.5 L27 18 L33.5 10.5"
          fill="none"
          stroke="#cdeede"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M30.5 10 L34 10 L34 13.5" fill="none" stroke="#cdeede" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
