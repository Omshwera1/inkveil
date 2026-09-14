# InkVeil

A full-stack temporary-tattoo e-commerce site built with Next.js (App Router), Prisma + SQLite, and a JWT-based admin panel.

## Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4
- **Backend**: Next.js API routes, Prisma ORM, SQLite (via `better-sqlite3` driver adapter)
- **Auth**: JWT stored in an httpOnly cookie, protecting `/admin/*` routes via `src/proxy.ts`

## Getting started

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run db:seed
npm run dev
```

Open http://localhost:3000 for the storefront.

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
