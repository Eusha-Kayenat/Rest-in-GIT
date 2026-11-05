"use client";

import { RouteError } from "@/components/states/RouteStates";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <RouteError title="The grave would not open" message="We could not finish this memorial. GitHub or the stonemason may be resting." onRetry={reset} />;
}
