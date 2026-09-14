"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Login failed.");
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="gradient-bg flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="glass-card w-full max-w-sm rounded-2xl border border-slate-100 p-8 shadow-lg"
      >
        <div className="mb-6 text-center">
          <div className="text-2xl font-extrabold text-slate-900">
            Ink<span className="gradient-text">Veil</span> Admin
          </div>
          <p className="mt-1 text-sm text-slate-500">Sign in to manage products</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400"
          placeholder="admin@inkveil.com"
        />

        <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400"
          placeholder="••••••••"
        />

        <button
          type="submit"
          disabled={loading}
          className="gradient-btn w-full rounded-full px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
