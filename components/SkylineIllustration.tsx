export default function SkylineIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 300" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b3a8a" />
          <stop offset="100%" stopColor="#0b1740" />
        </linearGradient>
      </defs>
      <rect width="800" height="300" fill="url(#sky)" />
      {[
        [10, 140, 60, 160],
        [80, 100, 55, 200],
        [145, 160, 50, 140],
        [205, 70, 65, 230],
        [280, 120, 50, 180],
        [340, 40, 70, 260],
        [420, 110, 55, 190],
        [485, 85, 60, 215],
        [555, 150, 50, 150],
        [615, 60, 65, 240],
        [690, 130, 55, 170],
        [755, 95, 45, 205],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="#ffffff" opacity={0.06 + (i % 3) * 0.03} rx="2" />
      ))}
    </svg>
  );
}
