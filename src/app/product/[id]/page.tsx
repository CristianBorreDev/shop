"use client";
import { useParams } from "next/navigation";
import products from "@/data/products.json";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import type { Product } from "@/types/product";

export default function ProductDetail() {
  const { id } = useParams();
  const addToCart = useCartStore((s) => s.addToCart);

  // Buscar producto en JSON
  const product = products.find((p: Product) => p.id === Number(id));

  if (!product) {
    return (
      <section className="text-center py-20 text-neutral-400">
        <h2 className="text-xl mb-4">Producto no encontrado 😢</h2>
        <Link
          href="/"
          className="bg-[var(--primary)] text-black px-4 py-2 rounded-lg hover:bg-cyan-300"
        >
          Volver a la tienda
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
      {/* Imagen */}
      <div className="flex justify-center">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="rounded-2xl object-cover border border-neutral-800"
        />
      </div>

      {/* Detalle */}
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
        <p className="text-neutral-400 mb-4">{product.category}</p>
        <p className="text-2xl text-[var(--primary)] font-semibold mb-6">
          ${product.price.toFixed(2)}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="bg-[var(--primary)] text-black px-5 py-2 rounded-lg hover:bg-cyan-300 transition"
        >
          Añadir al carrito
        </button>

        <Link
          href="/"
          className="mt-6 inline-block text-sm text-neutral-400 hover:text-[var(--primary)] transition"
        >
          ← Volver a la tienda
        </Link>
      </div>
    </section>
  );
}
