import { NextResponse } from "next/server";
import { autopsy, seance, toEpitaphStyle } from "@/lib/epitaph";
import { getRepoFacts, GraveError, parseRepoUrl } from "@/lib/github";

type RitualBody = { owner?: unknown; repo?: unknown; ritual?: unknown; style?: unknown };

const STATUS: Record<GraveError["kind"], number> = { "not-found": 404, "rate-limited": 429, unknown: 502 };

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as RitualBody | null;
  const ref =
    typeof body?.owner === "string" && typeof body.repo === "string" ? parseRepoUrl(`${body.owner}/${body.repo}`) : null;
  const ritual = body?.ritual;
  if (!ref || (ritual !== "autopsy" && ritual !== "seance")) {
    return NextResponse.json({ error: "The spirits could not make out that request." }, { status: 400 });
  }
  try {
    const facts = await getRepoFacts(ref.owner, ref.repo);
    const style = toEpitaphStyle(typeof body?.style === "string" ? body.style : undefined);
    return NextResponse.json(ritual === "autopsy" ? await autopsy(facts, style) : await seance(facts, style));
  } catch (error) {
    const grave = error instanceof GraveError ? error : new GraveError("unknown");
    return NextResponse.json({ error: grave.message }, { status: STATUS[grave.kind] });
  }
}
