"use client";

import { useState } from "react";
import { DownloadIcon, LinkIcon, XIcon } from "../icons";

export function ShareActions({ shareText }: { shareText: string }) {
  const [copied, setCopied] = useState(false);
  const [note, setNote] = useState("");

  const shareOnX = () => {
    const text = `${shareText}\n\n${window.location.href}`;
    window.open(`https://x.com/intent/post?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy this link", window.location.href);
    }
  };

  return (
    <>
      <div className="actions" aria-label="Share this memorial">
        <button className="primary-action" onClick={shareOnX}>
          <XIcon /> Share on X
        </button>
        <button onClick={() => setNote("The stonemason is still carving PNG cards. Come back soon.")}>
          <DownloadIcon /> Download PNG
        </button>
        <button onClick={copyLink} className={copied ? "is-copied" : ""}>
          <LinkIcon /> {copied ? "Link copied" : "Copy link"}
        </button>
      </div>
      <p className="mt-3 min-h-5 text-center text-xs text-stone" aria-live="polite">
        {note}
      </p>
    </>
  );
}
