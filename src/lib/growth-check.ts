import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { analyzePage, type GrowthCheckResult } from "./growth-analyze";

const MAX_BYTES = 1_500_000;
const MAX_REDIRECTS = 4;
const TIMEOUT_MS = 9000;

// Only public web addresses: this runs on our server, so it must not be usable
// to reach localhost, private networks or cloud metadata endpoints.
function publicUrl(input: string): URL | null {
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(input) ? input : `https://${input}`);
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  if (url.username || url.password) return null;
  if (url.port && url.port !== "80" && url.port !== "443") return null;

  const host = url.hostname.toLowerCase();
  if (!host.includes(".") || host.includes(":") || host.startsWith("[")) return null;
  if (/^[\d.]+$/.test(host) || /^0x/i.test(host)) return null;
  if (/(^|\.)(localhost|local|internal|lan|home|corp|test|invalid|example)$/.test(host))
    return null;
  return url;
}

async function fetchPage(start: URL) {
  let url = start;
  const began = Date.now();
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const res = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; QuickGrowthCheck/1.0; +https://pritesh-lad.vercel.app/check)",
        accept: "text/html,application/xhtml+xml",
      },
    });

    if (res.status >= 300 && res.status < 400) {
      const next = publicUrl(new URL(res.headers.get("location") ?? "", url).toString());
      if (!next) throw new Error("redirect");
      url = next;
      continue;
    }
    if (!res.ok) throw new Error(`status:${res.status}`);
    if (!(res.headers.get("content-type") ?? "").includes("html")) throw new Error("not-html");

    const responseMs = Date.now() - began;
    const reader = res.body?.getReader();
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    let truncated = false;
    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      bytes += value.byteLength;
      if (bytes >= MAX_BYTES) {
        truncated = true;
        await reader.cancel();
        break;
      }
    }
    const buffer = new Uint8Array(bytes);
    let offset = 0;
    for (const c of chunks) {
      buffer.set(c, offset);
      offset += c.byteLength;
    }
    return {
      finalUrl: url.toString(),
      html: new TextDecoder().decode(buffer),
      responseMs,
      bytes,
      truncated,
    };
  }
  throw new Error("redirect");
}

function explain(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  if (message.startsWith("status:")) {
    return `The website answered with an error (${message.slice(7)}), so we couldn't read the page. Some sites block automated checks.`;
  }
  if (message === "not-html") return "That address didn't return a web page.";
  if (message === "redirect") return "The website redirected somewhere we couldn't follow.";
  if (error instanceof Error && error.name === "TimeoutError") {
    return "The website took too long to respond, which is worth looking into on its own.";
  }
  return "We couldn't reach that website. Check the address and try again.";
}

export const runGrowthCheck = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ url: z.string().trim().min(3).max(300) }).parse(data))
  .handler(async ({ data }): Promise<GrowthCheckResult> => {
    const url = publicUrl(data.url);
    if (!url)
      return { ok: false, error: "Please enter a public website address, like yourbusiness.com." };
    try {
      return analyzePage(await fetchPage(url));
    } catch (error) {
      return { ok: false, error: explain(error) };
    }
  });
