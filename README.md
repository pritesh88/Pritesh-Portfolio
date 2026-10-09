# Growwise Studio

Website for Growwise Studio, a web development studio in Pune. Built to turn visitors into
qualified enquiries through two tools: **Plan My Website** (`/plan`) and the **Quick Growth
Check** (`/check`).

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Development

You need Node.js and npm.

```sh
npm i
npm run dev
```

## Where things live

| What                                                               | Where                         |
| ------------------------------------------------------------------ | ----------------------------- |
| Studio details, services, pricing, case studies, FAQ, testimonials | `src/data/site.ts`            |
| Resource articles                                                  | `src/data/resources.ts`       |
| Planner questions and recommendation rules                         | `src/lib/planner.ts`          |
| Growth Check rules (what is read from a page)                      | `src/lib/growth-analyze.ts`   |
| Homepage sections                                                  | `src/components/Sections.tsx` |

After adding a case study, article or business type, add its URL to `public/sitemap.xml`.

## Optional configuration

Everything works without these. Set them as environment variables in the hosting dashboard.

| Variable           | Effect                                                                                                                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `LEAD_WEBHOOK_URL` | Planner submissions are POSTed here as JSON (Google Sheets Apps Script, Formspree, Make, Zapier…). Without it, leads arrive only when the visitor sends the prefilled WhatsApp or email message. |
| `VITE_GA_ID`       | GA4 measurement ID. Enables analytics and conversion events (`cta_plan`, `planner_step`, `planner_completed`, `planner_request_plan`, `growth_check_started`, …).                                |

`studio.bookingUrl` in `src/data/site.ts` takes a Cal.com / Calendly link for "Book a 15-minute
call". While empty, that button opens WhatsApp with a prefilled message.

## Image credits

The photos in `src/assets/stock/` are from [Unsplash](https://unsplash.com/license) and are free to use commercially without attribution. Project screenshots are of our own client work.
