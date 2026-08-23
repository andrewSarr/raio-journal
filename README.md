# raio journal

The blog and newsletter for [raio](https://github.com/andrewSarr/raio) — a
Next.js app with a password-gated `/admin` for writing posts in a rich
markdown editor, and a newsletter signup that stores subscribers in Postgres.

Deployed to Vercel. Public site + `/admin` live in the same app; `/admin` is
the only part that needs auth.

## Stack

- **Next.js 16** (App Router), Tailwind v4, design tokens matching the raio
  brand (cream/blueprint canvas, Fraunces serif, IBM Plex Mono/Sans, rust
  accent — same palette as `raio/promo` and `raio-landing`).
- **Prisma + Postgres** — two models, `Post` and `Subscriber` (see
  `prisma/schema.prisma`).
- **`@uiw/react-md-editor`** for the admin post editor (split edit/live-preview).
- **No external auth provider.** A single `ADMIN_PASSWORD` gates `/admin` via
  an HMAC-signed session cookie (`src/lib/session.ts`), checked in
  `src/proxy.ts` (Next 16 renamed `middleware.ts` → `proxy.ts`).

## Local development

```bash
npm install
docker run -d --name raio-blog-db -e POSTGRES_PASSWORD=raioblog -e POSTGRES_DB=raioblog -p 5434:5432 postgres:16-alpine
cp .env.example .env   # then edit DATABASE_URL/ADMIN_PASSWORD/SESSION_SECRET
npx prisma migrate dev
npm run dev
```

Admin: `/admin` (redirects to `/admin/login` if not signed in).

## Deploying

1. Push this repo to GitHub, import it in Vercel.
2. Vercel → Storage → Create Database → Postgres — this sets `DATABASE_URL`
   on the project automatically.
3. Add `ADMIN_PASSWORD` and `SESSION_SECRET` in Vercel → Settings →
   Environment Variables (see `.env.example` for what each does).
4. Deploy. `npm run build` runs `prisma migrate deploy` first, so the schema
   applies on every deploy — no manual migration step.

## Newsletter sending

This app **captures** subscribers (public signup form → `Subscriber` table,
CSV export from `/admin/subscribers`) but doesn't send campaigns — that's a
deliberately separate concern (deliverability, unsubscribe links, compliance
are their own project). To actually mail the list: export the CSV and import
it into whatever you pick (Resend, Buttondown, etc.), or wire their API into
`src/app/api/subscribe/route.ts` to mirror new signups there in real time.

## Structure

```text
src/proxy.ts                    admin auth gate (Next 16 "proxy", was middleware)
src/lib/session.ts               HMAC session token (Edge + Node compatible)
src/lib/prisma.ts                Prisma client singleton
src/app/admin/login/             public login page + login/logout server actions
src/app/admin/(dashboard)/       everything behind auth (posts, subscribers)
  page.tsx                       post list
  posts/PostEditor.tsx           the rich editor (shared by new + edit)
  posts/actions.ts                save/delete server actions
  subscribers/                    list + CSV export
src/app/page.tsx                 public post list + signup
src/app/posts/[slug]/page.tsx    public post page
src/app/api/subscribe/route.ts   public signup endpoint (honeypot + validation)
prisma/schema.prisma             Post + Subscriber models
```

## License

MIT.
