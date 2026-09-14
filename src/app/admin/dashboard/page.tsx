import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductTable from "@/components/admin/ProductTable";

export default async function AdminDashboardPage() {
  const admin = await getAdminSession();
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader name={admin?.name ?? "Admin"} />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Products</h1>
            <p className="text-sm text-slate-500">{products.length} total products</p>
          </div>
          <Link
            href="/admin/products/new"
            className="gradient-btn rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            + Add Product
          </Link>
        </div>

        <ProductTable products={products} />
      </main>
    </div>
  );
}
