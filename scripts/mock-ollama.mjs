// Stand-in for Ollama's POST /api/generate, used by tests and local dev.
// Model names pick a behaviour: "mock-broken-json" returns invalid JSON,
// "mock-sleepy" answers after 6 seconds, anything else answers normally.
import http from "node:http";
import { fileURLToPath } from "node:url";

const REPLIES = {
  epitaph: "Here lies a repo that shipped with pride,\nits final commit, its last goodbye.",
  autopsy:
    "Speculation: its maintainers likely moved on to newer work. Without fresh commits, the issues slowly piled up.",
  seance: "I remember my last words well. Someone still stars me now and then, and I feel it.",
  classify: JSON.stringify({ category: "Humble", joke: "Even in death, it fixed one more typo." }),
};

function taskOf(prompt) {
  const match = /^TASK: (\w+)/.exec(prompt);
  return match?.[1] ?? "epitaph";
}

function reply(body) {
  if (body.model === "mock-broken-json") return "definitely not { json";
  return REPLIES[taskOf(body.prompt ?? "")] ?? REPLIES.epitaph;
}

export function createMockOllama() {
  return http.createServer((req, res) => {
    if (req.method !== "POST" || req.url !== "/api/generate") {
      res.writeHead(404).end();
      return;
    }
    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", () => {
      const body = JSON.parse(raw || "{}");
      const send = () => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ model: body.model, response: reply(body), done: true }));
      };
      if (body.model === "mock-sleepy") setTimeout(send, 6000);
      else send();
    });
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 11434);
  createMockOllama().listen(port, () => console.log(`mock ollama on http://localhost:${port}`));
}
