import type { CSSProperties, ReactNode } from "react";
import type { CardData } from "@/lib/card-data";

const NIGHT = "#0d0914";
const STONE = "#999991";
const AMBER = "#d39a47";
const PALE = "#eee9df";
const INK = "#1d1822";
const SERIF = "Cormorant Garamond";
const MONO = "IBM Plex Mono";

const mono = (size: number, color = INK): CSSProperties => ({
  fontFamily: MONO,
  fontSize: size,
  letterSpacing: size * 0.22,
  textTransform: "uppercase",
  color,
});

function Scene({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        backgroundColor: NIGHT,
        backgroundImage: "radial-gradient(circle at 86% 18%, rgba(238,233,223,0.28) 0, rgba(13,9,20,0) 230px)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 52,
          right: 86,
          width: 112,
          height: 112,
          borderRadius: 56,
          backgroundColor: "#d8d4c8",
          boxShadow: "0 0 80px rgba(238,233,223,0.45)",
        }}
      />
      <div style={{ position: "absolute", left: 40, top: 40, display: "flex", ...mono(16, STONE) }}>Rest-in-GIT</div>
      <div
        style={{
          position: "absolute",
          left: 40,
          bottom: 30,
          display: "flex",
          flexDirection: "column",
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: 26,
          lineHeight: 1.15,
          color: STONE,
        }}
      >
        <div style={{ display: "flex" }}>Every repo has</div>
        <div style={{ display: "flex" }}>last words.</div>
      </div>
      <div
        style={{
          width: 780,
          height: 596,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "52px 64px 0",
          borderRadius: "300px 300px 0 0",
          border: "3px solid #c9c8bf",
          borderBottom: "none",
          backgroundImage: "linear-gradient(180deg, #c3c2ba 0%, #a7a69e 55%, #8f8e87 100%)",
          boxShadow: "inset 0 0 60px rgba(0,0,0,0.35)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Dates({ data }: { data: CardData }) {
  const label = (text: string) => <div style={{ display: "flex", ...mono(13) }}>{text}</div>;
  const year = (value: number) => <div style={{ display: "flex", fontFamily: SERIF, fontSize: 46, fontWeight: 600, color: INK }}>{value}</div>;
  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 150 }}>
        {label("Born")}
        {year(data.born)}
      </div>
      <div style={{ width: 2, height: 58, backgroundColor: "rgba(29,24,34,0.35)" }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 150 }}>
        {label(data.status === "alive" ? "Last seen" : "Died")}
        {year(data.died)}
      </div>
    </div>
  );
}

function LastWords({ data }: { data: CardData }) {
  const quoted = data.status === "never-lived" ? data.lastWords : `“${data.lastWords}”`;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 620,
        marginTop: 16,
        padding: "14px 26px",
        backgroundColor: "rgba(13,9,20,0.92)",
        border: `2px solid ${INK}`,
        borderRadius: 4,
      }}
    >
      <div style={{ display: "flex", ...mono(13, STONE) }}>
        <span style={{ color: AMBER, marginRight: 14 }}>†</span>Last words<span style={{ color: AMBER, marginLeft: 14 }}>†</span>
      </div>
      <div style={{ display: "flex", textAlign: "center", marginTop: 6, fontFamily: MONO, fontSize: 21, color: PALE }}>{quoted}</div>
      <div style={{ display: "flex", marginTop: 6, ...mono(13, AMBER) }}>{data.category}</div>
    </div>
  );
}

export function CardImage({ data }: { data: CardData }) {
  const survivors = [
    data.survivedBy.length ? `Survived by ${data.survivedBy.join(", ")}` : "No known survivors",
    data.stars === 0 ? "Nobody came to the funeral." : null,
  ]
    .filter(Boolean)
    .join(" · ");
  return (
    <Scene>
      <div style={{ display: "flex", ...mono(15) }}>{data.status === "alive" ? "Prematurely mourning" : "In loving memory of"}</div>
      <div style={{ display: "flex", fontFamily: SERIF, fontSize: 82, fontWeight: 600, lineHeight: 1, marginTop: 8, color: INK }}>{data.repo}</div>
      <div style={{ display: "flex", marginTop: 6, ...mono(15) }}>{`${data.owner} / ${data.repo}`}</div>
      <Dates data={data} />
      <div style={{ display: "flex", ...mono(12) }}>{data.lifespan}</div>
      <LastWords data={data} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 14 }}>
        {data.epitaph.split("\n").map((line) => (
          <div key={line} style={{ display: "flex", fontFamily: SERIF, fontStyle: "italic", fontSize: 27, lineHeight: 1.2, color: INK }}>
            {line}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", marginTop: 12, ...mono(13) }}>{survivors}</div>
    </Scene>
  );
}

export function FallbackCardImage({ name }: { name: string }) {
  return (
    <Scene>
      <div style={{ display: "flex", marginTop: 40, ...mono(16) }}>Here lies nothing at all</div>
      <div style={{ display: "flex", fontFamily: SERIF, fontSize: 86, fontWeight: 600, marginTop: 24, color: INK }}>An empty grave</div>
      <div style={{ display: "flex", marginTop: 18, ...mono(17) }}>{name}</div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 46, fontFamily: SERIF, fontStyle: "italic", fontSize: 32, color: INK }}>
        <div style={{ display: "flex" }}>No body found. Are you sure it ever existed?</div>
        <div style={{ display: "flex", marginTop: 6 }}>Bury a real repo at Rest-in-GIT.</div>
      </div>
    </Scene>
  );
}
