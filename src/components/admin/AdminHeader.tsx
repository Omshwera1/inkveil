"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminHeader({ name }: { name: string }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/admin/dashboard" className="text-lg font-extrabold text-slate-900">
          Ink<span className="gradient-text">Veil</span> Admin
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-slate-500">Signed in as {name}</span>
          <Link href="/" className="font-medium text-blue-600 hover:underline">
            View store
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-full border border-slate-200 px-4 py-1.5 font-medium text-slate-700 hover:bg-slate-50"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
