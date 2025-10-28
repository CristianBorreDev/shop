import products from "@/data/products.json";
import ProductCard from "@/components/shop/ProductCard";
import type { Product } from "@/types/product";
import Link from "next/link";

export default function FeaturedProducts() {
  // Si ninguno tiene featured:true, mostramos los primeros 4
  const featured = (products as Product[]).filter((p) => p.featured);
  const items = featured.length ? featured.slice(0, 4) : (products as Product[]).slice(0, 4);

  return (
    <section className="max-w-6xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-[var(--primary)]">Destacados</h2>
        <Link href="/category/all" className="text-sm text-neutral-400 hover:text-[var(--primary)]">Ver todo</Link>
      </div>

      <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
        {items.map((p: Product) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
