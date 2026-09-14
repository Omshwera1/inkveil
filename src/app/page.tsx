import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import FaqSection from "@/components/FaqSection";

const CATEGORY_ICON: Record<string, string> = {
  flower: "🌸",
  wristband: "🖐️",
  om: "🕉️",
  heart: "💕",
};

export default async function Home() {
  const [categories, featured] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({
      where: { featured: true },
      include: { category: true },
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="gradient-bg relative overflow-hidden px-6 pb-20 pt-16">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wide text-slate-600">
                ✨ WATERPROOF · SKIN-SAFE · 3-7 DAY WEAR
              </span>

              <h1 className="mt-6 text-5xl font-extrabold leading-[1.1] text-slate-900 sm:text-6xl">
                Your skin is
                <br />a canvas.
                <br />
                <span className="gradient-text italic">Wear the story</span>
                <br />
                <span className="gradient-text italic">you want, today.</span>
              </h1>

              <p className="mt-6 max-w-md text-slate-600">
                InkVeil designs realistic, waterproof temporary tattoos — from
                intricate mandala &amp; mehndi art to bold wristbands and
                spiritual motifs. No pain, no commitment, all confidence.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="gradient-btn rounded-full px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:opacity-90"
                >
                  Explore Designs →
                </Link>
                <a
                  href="#how-it-works"
                  className="flex items-center gap-2 rounded-full border border-slate-300 px-7 py-3.5 font-semibold text-slate-800 transition hover:bg-white"
                >
                  ▶ How It Works
                </a>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {[
                  { icon: "💧", label: "Waterproof", sub: "Live freely" },
                  { icon: "🌿", label: "Skin-Safe", sub: "Gentle always" },
                  { icon: "📅", label: "3-7 Day Wear", sub: "Just the right time" },
                  { icon: "✨", label: "Non-Toxic", sub: "Good for you" },
                ].map((f) => (
                  <div key={f.label}>
                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg shadow-sm">
                      {f.icon}
                    </div>
                    <div className="text-sm font-semibold text-slate-800">{f.label}</div>
                    <div className="text-xs text-slate-500">{f.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="glass-card relative overflow-hidden rounded-[28px] p-3 shadow-xl">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1553434133-49895de9d753?w=900&q=80"
                    alt="Woman with henna mandala temporary tattoo on her arm"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute left-4 top-4 max-w-[140px] font-serif italic leading-tight text-white drop-shadow">
                    More than
                    <br />a tattoo
                  </div>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-4 py-4 text-center text-[10px] font-bold leading-tight text-slate-700 backdrop-blur">
                    REAL
                    <br />DESIGNS
                    <br />REAL
                    <br />YOU
                  </div>
                  <div className="absolute bottom-16 right-4 rounded-xl bg-white/85 px-3 py-3 text-right text-[10px] font-bold leading-tight text-slate-700 backdrop-blur">
                    EXPRESS
                    <br />EXPLORE
                    <br />EVOLVE
                  </div>
                </div>
              </div>
              <div className="glass-card absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-slate-700 shadow-md">
                🌿 Self-expression looks good on you.
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-12 max-w-xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                Collections
              </span>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Find your design</h2>
              <p className="mt-3 text-slate-600">
                Curated collections, each waterproof and made to last through everyday life.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/products?category=${c.slug}`}
                  className="glass-card rounded-2xl border border-slate-100 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="gradient-btn mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl text-white">
                    {CATEGORY_ICON[c.icon] ?? "✨"}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900">{c.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        {featured.length > 0 && (
          <section className="bg-white px-6 py-20">
            <div className="mx-auto max-w-6xl">
              <div className="mx-auto mb-12 max-w-xl text-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                  Best Sellers
                </span>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">Featured designs</h2>
              </div>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {featured.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    className="group overflow-hidden rounded-2xl border border-slate-100 shadow-sm transition hover:shadow-lg"
                  >
                    <div className="relative aspect-square overflow-hidden bg-slate-100">
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        fill
                        className="object-cover transition group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-slate-500">{p.category.name}</div>
                      <div className="mt-1 font-semibold text-slate-900">{p.name}</div>
                      <div className="mt-2 font-bold text-blue-600">₹{p.price.toFixed(0)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Why choose */}
        <section className="gradient-bg px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-14 max-w-xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                The InkVeil Difference
              </span>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Why choose our tattoos</h2>
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              {[
                {
                  n: "01",
                  t: "Looks like real ink",
                  d: "Fine printing technology renders detail sharp enough to pass for a real tattoo — perfect for arms, shoulders, back, or covering a scar.",
                },
                {
                  n: "02",
                  t: "Waterproof & long-lasting",
                  d: "Built to survive showers, swims and sweat. Most designs hold for 3-7 days depending on placement and care.",
                },
                {
                  n: "03",
                  t: "Zero pain, zero commitment",
                  d: "Change your look as often as you like. No needles, no appointments — just water and a minute of patience.",
                },
              ].map((w) => (
                <div key={w.n} className="glass-card rounded-2xl p-8 text-center shadow-sm">
                  <div className="gradient-text mb-3 text-sm font-extrabold tracking-widest">{w.n}</div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900">{w.t}</h3>
                  <p className="text-sm text-slate-600">{w.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-14 max-w-xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                Application &amp; Care
              </span>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Four steps to a flawless tattoo</h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
              {[
                { t: "Prep the skin", d: "Clean and dry the area. Avoid hairy patches for the cleanest transfer." },
                { t: "Peel & place", d: "Remove the clear film and press the design face-down where you want it." },
                { t: "Wet & wait", d: "Soak the backing paper for 15-20 seconds, then hold firmly in place." },
                { t: "Peel & reveal", d: "Slide the paper off slowly. Avoid friction for the first hour to lock it in." },
              ].map((s, i) => (
                <div key={s.t} className="text-center">
                  <div className="gradient-btn mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full font-bold text-white">
                    {i + 1}
                  </div>
                  <h3 className="mb-2 font-semibold text-slate-900">{s.t}</h3>
                  <p className="text-sm text-slate-600">{s.d}</p>
                </div>
              ))}
            </div>

            <div className="glass-card mt-16 rounded-2xl border border-slate-100 p-10">
              <h3 className="text-center text-xl font-bold text-slate-900">How long will it last?</h3>
              <p className="mx-auto mt-2 max-w-md text-center text-sm text-slate-600">
                Longevity depends on placement — high-friction areas fade faster.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
                {[
                  { z: "Ear & Neck", d: "3-5 days" },
                  { z: "Chest & Back", d: "2-3 days" },
                  { z: "Wrist", d: "2-5 days" },
                  { z: "Finger", d: "~24 hrs" },
                  { z: "Leg & Ankle", d: "4-7 days" },
                ].map((d) => (
                  <div key={d.z} className="rounded-xl bg-white p-4 text-center shadow-sm">
                    <div className="text-sm font-semibold text-slate-800">{d.z}</div>
                    <div className="gradient-text mt-1 text-sm font-bold">{d.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="reviews" className="gradient-bg px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-14 max-w-xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                Loved by thousands
              </span>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">What our customers say</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  q: "I wore the mandala design to a wedding and three people asked which artist did my real tattoo. Held up through a full day of dancing.",
                  n: "Priya S.",
                },
                {
                  q: "Application was so easy — thirty seconds with water and it looked salon-quality. Lasted through the pool all weekend.",
                  n: "Rohan M.",
                },
                {
                  q: "Got the matching Mom & Dad set for a family photoshoot. Everyone thought we'd gotten real tattoos together!",
                  n: "Anita & Vikram",
                },
              ].map((t) => (
                <div key={t.n} className="glass-card rounded-2xl p-7 shadow-sm">
                  <div className="mb-3 text-amber-500">★★★★★</div>
                  <p className="text-sm text-slate-700">&ldquo;{t.q}&rdquo;</p>
                  <div className="mt-4 text-sm font-semibold text-slate-500">— {t.n}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FaqSection />

        {/* Newsletter */}
        <section className="bg-slate-950 px-6 py-20 text-center text-white">
          <h2 className="text-3xl font-bold">Join the InkVeil list</h2>
          <p className="mx-auto mt-2 max-w-md text-slate-400">
            New designs, drops, and application tips — straight to your inbox.
          </p>
          <form className="mx-auto mt-8 flex max-w-md gap-3">
            <input
              type="email"
              required
              placeholder="Your email address"
              className="flex-1 rounded-full border-none px-5 py-3.5 text-sm text-slate-900 outline-none"
            />
            <button
              type="submit"
              className="gradient-btn rounded-full px-6 py-3.5 text-sm font-semibold text-white"
            >
              Subscribe
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
