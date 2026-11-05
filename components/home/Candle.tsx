export function Candle({ delay = "0s" }: { delay?: string }) {
  return (
    <span className="candle" aria-hidden="true">
      <span className="candle-glow" style={{ animationDelay: delay }} />
      <span className="candle-flame" style={{ animationDelay: delay }} />
      <span className="candle-wick" />
      <span className="candle-body">
        <span />
      </span>
      <span className="candle-pool" />
    </span>
  );
}
