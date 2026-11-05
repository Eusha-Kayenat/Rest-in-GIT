import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { CardImage, FallbackCardImage } from "@/components/card/CardImage";
import { sanitizeParam, truncate } from "@/lib/card";
import { buildCardData } from "@/lib/card-data";
import { toEpitaphStyle } from "@/lib/epitaph";

export const runtime = "nodejs";

type FontWeight = 400 | 500 | 600;
type FontFile = { name: string; file: string; weight: FontWeight; style: "normal" | "italic" };

const FONT_FILES: FontFile[] = [
  { name: "Cormorant Garamond", file: "cormorant-garamond-latin-600-normal.woff", weight: 600, style: "normal" },
  { name: "Cormorant Garamond", file: "cormorant-garamond-latin-500-italic.woff", weight: 500, style: "italic" },
  { name: "IBM Plex Mono", file: "ibm-plex-mono-latin-400-normal.woff", weight: 400, style: "normal" },
  { name: "IBM Plex Mono", file: "ibm-plex-mono-latin-500-normal.woff", weight: 500, style: "normal" },
];

let fontsPromise: Promise<(Omit<FontFile, "file"> & { data: ArrayBuffer })[]> | null = null;

function loadFonts() {
  fontsPromise ??= Promise.all(
    FONT_FILES.map(async ({ file, ...font }) => {
      const buffer = await readFile(path.join(process.cwd(), "public", "fonts", file));
      return { ...font, data: buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer };
    }),
  );
  return fontsPromise;
}

type Params = Promise<{ owner: string; repo: string }>;

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { owner, repo } = await params;
  const query = request.nextUrl.searchParams;
  const [fonts, data] = await Promise.all([
    loadFonts(),
    buildCardData(owner, repo, {
      epitaph: sanitizeParam(query.get("e")),
      category: sanitizeParam(query.get("c"), 40),
      style: toEpitaphStyle(query.get("s") ?? undefined),
    }),
  ]);
  const card = data ? <CardImage data={data} /> : <FallbackCardImage name={truncate(`${owner}/${repo}`, 60)} />;
  return new ImageResponse(card, {
    width: 1200,
    height: 630,
    fonts,
    headers: { "Cache-Control": data ? "public, max-age=3600, s-maxage=86400" : "public, max-age=300" },
  });
}
