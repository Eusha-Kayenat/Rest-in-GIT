"use client";

import { RouteError } from "@/components/states/RouteStates";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <RouteError title="The graveyard is shrouded in fog" message="We could not load the departed right now. Try again in a moment." onRetry={reset} />;
}
