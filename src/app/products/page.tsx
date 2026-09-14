import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const [categories, products] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({
      where: category ? { category: { slug: category } } : undefined,
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="gradient-bg flex-1 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Shop
            </span>
            <h1 className="mt-2 text-4xl font-bold text-slate-900">All Designs</h1>
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/products"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                !category ? "gradient-btn text-white" : "glass-card text-slate-700"
              }`}
            >
              All
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/products?category=${c.slug}`}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === c.slug ? "gradient-btn text-white" : "glass-card text-slate-700"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>

          {products.length === 0 ? (
            <p className="text-center text-slate-500">No products found in this collection yet.</p>
          ) : (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {products.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-lg"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      className="object-cover transition group-hover:scale-105"
                    />
                    {p.stock <= 0 && (
                      <span className="absolute left-2 top-2 rounded-full bg-slate-900/80 px-2 py-1 text-[10px] font-semibold text-white">
                        Out of stock
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-slate-500">{p.category.name}</div>
                    <div className="mt-1 font-semibold text-slate-900">{p.name}</div>
                    <div className="mt-2 font-bold text-blue-600">₹{p.price.toFixed(0)}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
