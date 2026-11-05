"use client";

import { useEffect } from "react";
import { rememberGrave } from "@/lib/graveyard-storage";
import type { GraveyardEntry } from "@/lib/types";

export function RememberGrave({ entry }: { entry: GraveyardEntry }) {
  useEffect(() => rememberGrave(entry), [entry]);
  return null;
}
