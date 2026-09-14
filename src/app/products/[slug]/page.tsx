import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="gradient-bg flex-1 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <Link href="/products" className="mb-8 inline-block text-sm font-semibold text-blue-600">
            ← Back to all designs
          </Link>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="glass-card overflow-hidden rounded-2xl p-3">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image src={product.imageUrl} alt={product.name} fill className="object-cover" priority />
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                {product.category.name}
              </div>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">{product.name}</h1>
              <div className="gradient-text mt-4 text-2xl font-extrabold">₹{product.price.toFixed(0)}</div>
              <p className="mt-6 text-slate-600">{product.description}</p>

              <div className="mt-6 text-sm">
                {product.stock > 0 ? (
                  <span className="font-semibold text-emerald-600">In stock ({product.stock} available)</span>
                ) : (
                  <span className="font-semibold text-red-500">Out of stock</span>
                )}
              </div>

              <button
                disabled={product.stock <= 0}
                className="gradient-btn mt-8 w-full rounded-full px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
