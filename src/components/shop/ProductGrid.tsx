// components/ProductGrid.tsx
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0)
    return <p className="text-neutral-400 mt-6">No hay productos disponibles.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {products.map((p) => (
        <Link
          key={p.id}
          href={`/product/${p.id}`}
          className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 hover:shadow-lg hover:border-[var(--primary)] transition"
        >
          <div className="aspect-square relative mb-3">
            <Image
              src={p.image}
              alt={p.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <h3 className="text-sm font-medium">{p.name}</h3>
          <p className="text-[var(--secondary)] text-sm mt-1">
            ${p.price.toFixed(2)}
          </p>
        </Link>
      ))}
    </div>
  );
}
