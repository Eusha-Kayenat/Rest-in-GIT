// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ShareActions } from "../components/result/ShareActions";

const props = { repo: "atom", shareText: 'RIP atom (2012-2022). Last words: "wip"', cardUrl: "/api/card/atom/atom?s=classic" };

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("ShareActions", () => {
  it("opens a tweet intent with the share text and page url", () => {
    const open = vi.spyOn(window, "open").mockReturnValue(null);
    render(<ShareActions {...props} />);
    fireEvent.click(screen.getByRole("button", { name: /share on x/i }));
    const url = new URL(open.mock.calls[0][0] as string);
    expect(url.origin + url.pathname).toBe("https://twitter.com/intent/tweet");
    expect(url.searchParams.get("text")).toBe(props.shareText);
    expect(url.searchParams.get("url")).toBe(window.location.href);
  });

  it("downloads the card PNG", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(new Blob(["png"], { type: "image/png" })));
    vi.stubGlobal("fetch", fetchMock);
    URL.createObjectURL = vi.fn(() => "blob:card");
    URL.revokeObjectURL = vi.fn();
    const click = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (this: HTMLAnchorElement) {
      expect(this.download).toBe("rip-atom.png");
      expect(this.href).toBe("blob:card");
    });
    render(<ShareActions {...props} />);
    fireEvent.click(screen.getByRole("button", { name: /download png/i }));
    await waitFor(() => expect(click).toHaveBeenCalledOnce());
    expect(fetchMock).toHaveBeenCalledWith(props.cardUrl);
    expect(await screen.findByText(/tombstone carved/i)).toBeTruthy();
  });

  it("copies the link and shows a toast", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    render(<ShareActions {...props} />);
    fireEvent.click(screen.getByRole("button", { name: /copy link/i }));
    expect(await screen.findByText(/link copied/i)).toBeTruthy();
    expect(writeText).toHaveBeenCalledWith(window.location.href);
  });
});
