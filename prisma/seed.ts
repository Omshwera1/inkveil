import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const connectionString =
  process.env.POSTGRES_PRISMA_URL ?? (process.env.DATABASE_URL as string);
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  const adminEmail = "admin@inkveil.com";
  const adminPassword = "InkVeil@123";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, passwordHash, name: "Store Admin" },
  });

  const categories = [
    { name: "Mehndi & Henna", icon: "flower" },
    { name: "Wristbands", icon: "wristband" },
    { name: "Spiritual & Deities", icon: "om" },
    { name: "Family & Script", icon: "heart" },
  ];

  const createdCategories: Record<string, string> = {};
  for (const c of categories) {
    const cat = await prisma.category.upsert({
      where: { slug: slugify(c.name) },
      update: {},
      create: { name: c.name, slug: slugify(c.name), icon: c.icon },
    });
    createdCategories[c.name] = cat.id;
  }

  const products = [
    {
      name: "Mandala Bloom Henna Sleeve",
      description: "A full-arm mandala design inspired by bridal henna art. Waterproof and long-lasting.",
      price: 349,
      stock: 120,
      imageUrl: "https://images.unsplash.com/photo-1780247473193-f43e8e0089b1?w=800",
      categoryId: createdCategories["Mehndi & Henna"],
      featured: true,
    },
    {
      name: "Lotus Henna Hand Design",
      description: "Delicate lotus and paisley motifs for hands, perfect for festive occasions.",
      price: 249,
      stock: 90,
      imageUrl: "https://images.unsplash.com/photo-1761848456393-b5ef09c01f62?w=800",
      categoryId: createdCategories["Mehndi & Henna"],
      featured: false,
    },
    {
      name: "Tribal Armband Wristband",
      description: "Bold tribal wristband tattoo for a minimal, edgy statement.",
      price: 149,
      stock: 200,
      imageUrl: "https://images.unsplash.com/photo-1531951829979-d658d7e5e8a6?w=800",
      categoryId: createdCategories["Wristbands"],
      featured: true,
    },
    {
      name: "Om Trishul Spiritual Tattoo",
      description: "Sacred Om and Trishul design, fine linework for a devotional look.",
      price: 199,
      stock: 150,
      imageUrl: "https://images.unsplash.com/photo-1631879742133-a0dd6180abf9?w=800",
      categoryId: createdCategories["Spiritual & Deities"],
      featured: false,
    },
    {
      name: "Mom & Dad Script Set",
      description: "Matching 'Mom' and 'Dad' script tattoos for family photoshoots.",
      price: 179,
      stock: 100,
      imageUrl: "https://images.unsplash.com/photo-1570168983832-8989dae1522e?w=800",
      categoryId: createdCategories["Family & Script"],
      featured: true,
    },
  ];

  for (const p of products) {
    const slug = slugify(p.name);
    await prisma.product.upsert({
      where: { slug },
      update: { imageUrl: p.imageUrl },
      create: { ...p, slug },
    });
  }

  console.log("Seed complete.");
  console.log(`Admin login -> email: ${adminEmail}  password: ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
