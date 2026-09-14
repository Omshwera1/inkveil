import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 px-6 py-14 text-slate-400">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="mb-3 text-xl font-bold text-white">InkVeil</div>
          <p className="max-w-xs text-sm">
            Premium waterproof temporary tattoos for everyday self-expression.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-slate-100">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products" className="hover:text-white">All Designs</Link></li>
            <li><Link href="/products?category=mehndi-henna" className="hover:text-white">Mehndi &amp; Henna</Link></li>
            <li><Link href="/products?category=wristbands" className="hover:text-white">Wristbands</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-slate-100">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#how-it-works" className="hover:text-white">Application Guide</Link></li>
            <li><Link href="/#faq" className="hover:text-white">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold text-slate-100">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/admin/login" className="hover:text-white">Admin Login</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} InkVeil. All rights reserved.
      </div>
    </footer>
  );
}
