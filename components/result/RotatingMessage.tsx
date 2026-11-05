const MESSAGES = [
  "Consulting the spirits…",
  "Carving the stone…",
  "Lighting the candles…",
  "Asking the gravedigger for kind words…",
  "Dusting off the hymn book…",
];

export function RotatingMessage() {
  return (
    <p className="rotating-message" role="status" aria-label="Carving the epitaph">
      {MESSAGES.map((message, index) => (
        <span key={message} style={{ animationDelay: `${index * 1.6}s` }} aria-hidden="true">
          {message}
        </span>
      ))}
    </p>
  );
}
