import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const admin = await getAdminSession();
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader name={admin?.name ?? "Admin"} />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="mb-8 text-2xl font-bold text-slate-900">Add Product</h1>
        <ProductForm categories={categories} />
      </main>
    </div>
  );
}
