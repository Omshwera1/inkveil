# InkVeil

A full-stack temporary-tattoo e-commerce site built with Next.js (App Router), Prisma + PostgreSQL, and a JWT-based admin panel.

## Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4
- **Backend**: Next.js API routes, Prisma ORM, PostgreSQL (via `pg` + `@prisma/adapter-pg`)
- **Auth**: JWT stored in an httpOnly cookie, protecting `/admin/*` routes via `src/proxy.ts`

## Getting started

1. Set `DATABASE_URL` in `.env` to a Postgres connection string (a free one can be created with `npx create-db`, or point it at any Postgres instance).
2. Run:

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run db:seed
npm run dev
```

Open http://localhost:3000 for the storefront.

## Deploying on Vercel

1. Add the **Vercel Postgres** (or any Postgres) integration to the project in the Vercel dashboard — this sets `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING` automatically.
2. Deploy. The build script (`prisma generate && prisma migrate deploy && tsx prisma/seed.ts && next build`) applies any pending migrations and seeds the admin user + starter categories/products automatically on every build — no local terminal access needed. Both steps are idempotent (safe to re-run on every deploy).

The homepage and product pages are marked `force-dynamic` so admin changes show up immediately without a redeploy.

## Admin panel

Visit `/admin/login`. Seeded credentials:

- Email: `admin@inkveil.com`
- Password: `InkVeil@123`

From the dashboard (`/admin/dashboard`) you can add, edit, and delete products and mark them as featured on the homepage.

## Project structure

- `src/app` — pages (storefront + admin) and API routes
- `src/components` — shared UI (Header, Footer, FAQ) and admin components
- `src/lib` — Prisma client singleton and auth helpers
- `prisma/schema.prisma` — data model (Admin, Category, Product)
- `prisma/seed.ts` — seeds an admin user, categories, and sample products
