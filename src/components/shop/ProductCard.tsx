"use client";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import type { Product } from "@/types/product";
import Link from "next/link";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((s) => s.addToCart);

  return (
    <div className="bg-[var(--accent)] border border-neutral-800 rounded-2xl p-4 flex flex-col hover:scale-[1.02] transition-transform">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={300}
        className="rounded-xl object-cover"
      />
      <h3 className="mt-3 text-lg font-medium hover:text-[var(--primary)] transition">
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </h3>
      <p className="text-sm text-neutral-400">${product.price.toFixed(2)}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-3 bg-[var(--primary)] text-black py-1.5 rounded-lg hover:bg-cyan-300"
      >
        Añadir al carrito
      </button>
    </div>
  );
}
