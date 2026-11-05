"use client";

import { useEffect, useState } from "react";
import { DownloadIcon, LinkIcon, XIcon } from "../icons";

type ShareActionsProps = { repo: string; shareText: string; cardUrl: string };

export function tweetUrl(text: string, url: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
}

function useToast(): [string, (message: string) => void] {
  const [toast, setToast] = useState("");
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);
  return [toast, setToast];
}

async function downloadCard(cardUrl: string, filename: string): Promise<void> {
  const res = await fetch(cardUrl);
  if (!res.ok) throw new Error(`Card request failed: ${res.status}`);
  const href = URL.createObjectURL(await res.blob());
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(href);
}

export function ShareActions({ repo, shareText, cardUrl }: ShareActionsProps) {
  const [toast, showToast] = useToast();
  const [carving, setCarving] = useState(false);

  const shareOnX = () => {
    window.open(tweetUrl(shareText, window.location.href), "_blank", "noopener,noreferrer");
  };

  const download = async () => {
    setCarving(true);
    try {
      await downloadCard(cardUrl, `rip-${repo}.png`);
      showToast("Tombstone carved. Check your downloads.");
    } catch {
      showToast("The stonemason dropped the chisel. Try again.");
    } finally {
      setCarving(false);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Link copied. Spread the bad news.");
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
        <button onClick={download} disabled={carving} aria-busy={carving}>
          <DownloadIcon /> {carving ? "Carving…" : "Download PNG"}
        </button>
        <button onClick={copyLink}>
          <LinkIcon /> Copy link
        </button>
      </div>
      <div className={toast ? "toast is-visible" : "toast"} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}
