export default function AccentBar({ className }: { className?: string }) {
  return (
    <span
      className={`accent-line inline-block h-1 w-12 rounded-full ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}
