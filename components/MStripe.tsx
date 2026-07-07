export default function MStripe({ className }: { className?: string }) {
  return (
    <span
      className={`m-stripe inline-block h-1 w-12 rounded-full ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}
