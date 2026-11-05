export const CARD_PARAM_MAX = 120;

export function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

export function sanitizeParam(value: string | null | undefined, max = CARD_PARAM_MAX): string | null {
  if (!value) return null;
  const clean = value
    .replace(/<[^>]*>?/g, "")
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, " ")
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .slice(0, 2)
    .join("\n");
  return clean ? truncate(clean, max) : null;
}
