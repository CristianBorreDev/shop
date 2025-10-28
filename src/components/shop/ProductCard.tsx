"use client";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import type { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((s) => s.addToCart);

  return (
    <div className="bg-[var(--accent)] border border-neutral-800 rounded-2xl p-4 flex flex-col hover:scale-[1.02] transition-transform">
      <div className="relative">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="rounded-xl object-cover"
        />
        {product.featured && (
          <span className="absolute top-2 left-2 bg-[var(--primary)] text-black text-xs px-2 py-1 rounded-full">
            Destacado
          </span>
        )}
      </div>

      <h3 className="mt-3 text-lg font-medium">
        <Link href={`/product/${product.id}`} className="hover:text-[var(--primary)]">
          {product.name}
        </Link>
      </h3>

      <p className="text-sm text-neutral-400">${product.price.toFixed(2)}</p>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-[var(--primary)] text-black py-1.5 rounded-lg hover:bg-cyan-300"
        >
          Añadir
        </button>
        <Link href={`/product/${product.id}`} className="px-3 py-1.5 border border-neutral-700 rounded-lg text-sm text-neutral-300 hover:border-neutral-600">
          Ver
        </Link>
      </div>
    </div>
  );
}
