import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            InkVeil<sup className="text-xs align-super">®</sup>
          </span>
          <span className="text-[10px] font-semibold tracking-[0.2em] text-slate-400">
            WEAR YOUR STORY
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
          <Link href="/products" className="hover:text-slate-900">
            Designs
          </Link>
          <Link href="/#how-it-works" className="hover:text-slate-900">
            How It Works
          </Link>
          <Link href="/#reviews" className="hover:text-slate-900">
            Reviews
          </Link>
        </div>

        <Link
          href="/products"
          className="gradient-btn rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:opacity-90"
        >
          Explore Designs →
        </Link>
      </nav>
    </header>
  );
}
