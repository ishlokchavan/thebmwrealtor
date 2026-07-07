export default function SkylineIllustration({ className }: { className?: string }) {
  const buildings: [number, number, number, number][] = [
    [0, 150, 46, 150],
    [44, 108, 40, 192],
    [86, 168, 38, 132],
    [122, 78, 48, 222],
    [170, 128, 40, 172],
    [210, 52, 52, 248],
    [262, 120, 42, 180],
    [304, 92, 46, 208],
    [350, 158, 40, 142],
    [390, 68, 50, 232],
    [440, 138, 42, 162],
    [482, 100, 48, 200],
    [530, 164, 40, 136],
    [570, 84, 50, 216],
    [620, 130, 44, 170],
    [664, 110, 46, 190],
    [710, 156, 40, 144],
    [750, 96, 50, 204],
  ];
  return (
    <svg
      viewBox="0 0 800 300"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
    >
      {buildings.map(([x, y, w, h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} rx="1" fill="#0a0c10" opacity={0.55 + (i % 3) * 0.14} />
          {Array.from({ length: Math.floor(h / 26) }).map((_, r) =>
            Array.from({ length: Math.max(1, Math.floor(w / 16)) }).map((__, c) => {
              const lit = (i * 7 + r * 3 + c * 5) % 5 === 0;
              return (
                <rect
                  key={`${r}-${c}`}
                  x={x + 5 + c * 15}
                  y={y + 10 + r * 24}
                  width="6"
                  height="9"
                  fill={lit ? "#e7e0cf" : "#3a3833"}
                  opacity={lit ? 0.95 : 0.5}
                />
              );
            })
          )}
        </g>
      ))}
    </svg>
  );
}
