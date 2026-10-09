import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

declare const process: { env: Record<string, string | undefined> };

const leadSchema = z.object({
  source: z.enum(["planner", "growth-check"]),
  name: z.string().trim().min(1).max(120),
  business: z.string().trim().max(160),
  contact: z.string().trim().min(3).max(160),
  website: z.string().trim().max(300),
  summary: z.string().max(3000),
});

export type Lead = z.infer<typeof leadSchema>;

// Forwards a lead as JSON to LEAD_WEBHOOK_URL (a Google Sheets Apps Script, Formspree,
// Make/Zapier hook, etc.). Without that env var nothing is stored, and the UI relies on
// the WhatsApp / email hand-off instead.
export const submitLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const url = process.env["LEAD_WEBHOOK_URL"];
    if (!url) return { delivered: false };
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, receivedAt: new Date().toISOString() }),
        signal: AbortSignal.timeout(6000),
      });
      return { delivered: res.ok };
    } catch (error) {
      console.error("Lead webhook failed", error);
      return { delivered: false };
    }
  });
