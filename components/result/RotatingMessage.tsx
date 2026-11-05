"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Consulting the spirits…",
  "Carving the stone…",
  "Lighting the candles…",
  "Asking the gravedigger for kind words…",
  "Dusting off the hymn book…",
];

export function RotatingMessage() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), 1600);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <p role="status" aria-live="polite">
      {MESSAGES[index]}
    </p>
  );
}
