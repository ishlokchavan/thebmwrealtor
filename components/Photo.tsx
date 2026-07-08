"use client";

import { useState } from "react";

// Renders an <img> that simply removes itself if the source fails to load,
// so a gradient/solid fallback underneath is always shown (never a broken image).
export default function Photo({
  src,
  alt,
  className,
  fallback,
}: {
  src: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback ?? null}</>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
