"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import type { Product } from "@/types/product";
import { useState } from "react";
import { ShoppingCart, Eye, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const variantToAdd =
      product.variants && product.variants.length > 0
        ? product.variants[0]
        : undefined;

    addToCart(product, variantToAdd);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const discount =
    product.oldPrice && product.price < product.oldPrice
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col hover:shadow-[0_0_15px_rgba(123,92,255,0.25)] hover:border-[var(--primary)] transition-all duration-300"
    >
      {/* Imagen principal */}
      <div className="relative aspect-square mb-3 overflow-hidden rounded-xl">
        <Image
          src={product.image || product.images?.[0] || "/images/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {product.featured && (
          <span className="absolute top-2 left-2 bg-[var(--primary)] text-black text-xs px-2 py-1 rounded-full font-semibold">
            ⭐ Más vendido
          </span>
        )}
        {discount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            -{discount}%
          </span>
        )}
      </div>

      {/* Información principal */}
      <div className="flex flex-col gap-1 mb-3">
        <h3 className="text-sm md:text-base font-medium text-white truncate">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <p className="text-[var(--secondary)] font-semibold text-sm">
            ${product.price.toFixed(2)}
          </p>
          {product.oldPrice && (
            <p className="text-neutral-500 line-through text-xs">
              ${product.oldPrice.toFixed(2)}
            </p>
          )}
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 text-yellow-400 text-xs">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.round(product.rating) ? "currentColor" : "none"}
                stroke="currentColor"
              />
            ))}
            <span className="text-neutral-400 ml-1">
              {product.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Texto informativo de variantes */}
      {product.variantGroups && product.variantGroups.length > 0 && (
        <div className="mb-3 text-xs text-neutral-400 leading-relaxed">
          {product.variantGroups
            .filter(
              (group) =>
                ["color", "colores", "talla", "tallas"].includes(
                  group.name.toLowerCase()
                )
            )
            .map((group) => (
              <p key={group.name}>
                <span className="text-neutral-300 font-medium capitalize">
                  {group.name}:
                </span>{" "}
                {group.options
                  .slice(0, 4)
                  .map((opt) => opt.label)
                  .join(", ")}
                {group.options.length > 4 && " ..."}
              </p>
            ))}

          <p className="text-[10px] text-neutral-500 mt-1 italic">
            *Disponible en varias combinaciones
          </p>
        </div>
      )}

      {/* Botones */}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={handleAdd}
          aria-label="Agregar al carrito"
          disabled={product.stock <= 0}
          className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            added
              ? "bg-green-500 text-black"
              : product.stock <= 0
              ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
              : "bg-[var(--primary)] text-black hover:opacity-90 hover:shadow-[0_0_10px_rgba(123,92,255,0.4)]"
          }`}
        >
          <ShoppingCart size={16} />
          {added ? "Agregado" : "Agregar"}
        </button>

        <Link
          href={`/product/${product.slug}`}
          aria-label="Ver detalles del producto"
          className="flex items-center justify-center gap-1 px-3 py-1.5 border border-neutral-700 rounded-lg text-sm text-neutral-300 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-200"
        >
          <Eye size={16} />
          Ver
        </Link>
      </div>

      <p className="mt-3 text-[10px] text-neutral-500 text-center">
        🚚 Envíos rápidos · 💳 Pago seguro · ⭐ Garantía de satisfacción
      </p>
    </motion.div>
  );
}
