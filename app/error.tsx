"use client";

import { RouteError } from "@/components/states/RouteStates";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <RouteError title="The gates are stuck" message="Something went wrong on the way in. The spirits have been notified." onRetry={reset} />;
}
