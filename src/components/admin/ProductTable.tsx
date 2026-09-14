"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  featured: boolean;
  category: { name: string };
};

export default function ProductTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete product.");
      }
    } finally {
      setDeletingId(null);
    }
  }

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
        No products yet.{" "}
        <Link href="/admin/products/new" className="font-semibold text-blue-600">
          Add your first product
        </Link>
        .
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-5 py-3">Product</th>
            <th className="px-5 py-3">Category</th>
            <th className="px-5 py-3">Price</th>
            <th className="px-5 py-3">Stock</th>
            <th className="px-5 py-3">Featured</th>
            <th className="px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.map((p) => (
            <tr key={p.id}>
              <td className="flex items-center gap-3 px-5 py-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-slate-100">
                  <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                </div>
                <span className="font-medium text-slate-900">{p.name}</span>
              </td>
              <td className="px-5 py-3 text-slate-600">{p.category.name}</td>
              <td className="px-5 py-3 text-slate-600">₹{p.price.toFixed(0)}</td>
              <td className="px-5 py-3 text-slate-600">{p.stock}</td>
              <td className="px-5 py-3">
                {p.featured ? (
                  <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                    Featured
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">—</span>
                )}
              </td>
              <td className="px-5 py-3 text-right">
                <div className="flex justify-end gap-3">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id, p.name)}
                    disabled={deletingId === p.id}
                    className="font-medium text-red-500 hover:underline disabled:opacity-50"
                  >
                    {deletingId === p.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
