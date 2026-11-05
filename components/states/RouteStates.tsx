import Link from "next/link";

export function RouteLoading({ message }: { message: string }) {
  return (
    <div className="route-state" role="status" aria-live="polite">
      <div className="route-state-candle" aria-hidden="true">
        <span />
      </div>
      <p>{message}</p>
    </div>
  );
}

export function RouteError({ title, message, onRetry }: { title: string; message: string; onRetry: () => void }) {
  return (
    <div className="route-state" role="alert">
      <div className="route-state-stone" aria-hidden="true">
        ✝
      </div>
      <h1>{title}</h1>
      <p>{message}</p>
      <div className="route-state-actions">
        <button onClick={onRetry}>Try the ritual again</button>
        <Link href="/">Back to the gates</Link>
      </div>
    </div>
  );
}
