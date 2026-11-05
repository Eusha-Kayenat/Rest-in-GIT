const TIMEOUT_MS = 5000;

type GenerateOptions = { prompt: string; format?: "json" };

export async function generate({ prompt, format }: GenerateOptions): Promise<string> {
  const baseUrl = process.env.OLLAMA_URL ?? "http://localhost:11434";
  const res = await fetch(`${baseUrl}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.EPITAPH_MODEL ?? "gemma4:e4b",
      prompt,
      stream: false,
      keep_alive: "30m",
      options: { temperature: 0.9 },
      ...(format ? { format } : {}),
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Ollama answered ${res.status}`);
  const data: { response?: unknown } = await res.json();
  if (typeof data.response !== "string") throw new Error("Ollama sent no response");
  return data.response.trim();
}
