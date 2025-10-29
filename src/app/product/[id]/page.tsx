"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import products from "@/data/products.json";
import { useCartStore } from "@/lib/store";
import type { Product } from "@/types/product";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Check, Shield, Truck, CreditCard } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const addToCart = useCartStore((s) => s.addToCart);
  const product = (products as Product[]).find((p) => p.slug === id);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(
    product?.images?.[0] || product?.image || null
  );
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <section className="text-center py-20 text-neutral-400">
        <h2 className="text-xl mb-4 font-medium">Producto no encontrado 😢</h2>
        <Link
          href="/"
          className="bg-[var(--primary)] text-black px-4 py-2 rounded-lg hover:bg-cyan-300 transition"
        >
          Volver a la tienda
        </Link>
      </section>
    );
  }

  const handleSelect = (group: string, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [group]: option }));
  };

  const handleAddToCart = () => {
    if (product.variantGroups?.length) {
      const allSelected = product.variantGroups.every((g) => selectedOptions[g.name]);
      if (!allSelected) {
        alert("Selecciona todas las variantes antes de continuar.");
        return;
      }
    }

    const selectedVariant =
      product.variants?.find((v) =>
        Object.entries(selectedOptions).every(
          ([key, val]) => v.attributes?.[key] === val
        )
      ) || null;

    addToCart(product, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const discount =
    product.oldPrice && product.price < product.oldPrice
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  const related = (products as Product[])
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6 text-neutral-400">
        <Link href="/" className="hover:text-[var(--primary)]">Inicio</Link> /
        <Link
          href={`/category/${encodeURIComponent(product.category)}`}
          className="hover:text-[var(--primary)] mx-1"
        >
          {product.category}
        </Link>
        {product.subcategory && (
          <>
            /{" "}
            <Link
              href={`/category/${encodeURIComponent(product.category)}?sub=${encodeURIComponent(product.subcategory)}`}
              className="hover:text-[var(--primary)]"
            >
              {product.subcategory}
            </Link>
          </>
        )}
      </nav>

      {/* Contenido principal */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Galería */}
        <div className="flex flex-col gap-3">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full aspect-square"
          >
            <Image
              src={selectedImage || "/images/placeholder.png"}
              alt={product.name}
              fill
              className="object-cover rounded-2xl border border-neutral-800"
            />
            {discount && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                -{discount}%
              </span>
            )}
            {product.featured && (
              <span className="absolute top-3 right-3 bg-[var(--primary)] text-black text-xs px-3 py-1 rounded-full font-semibold">
                ⭐ Más vendido
              </span>
            )}
          </motion.div>

          {/* Miniaturas */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 justify-center mt-2 flex-wrap">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`rounded-lg border p-0 overflow-hidden ${
                    img === selectedImage
                      ? "border-[var(--primary)]"
                      : "border-neutral-700 hover:border-[var(--primary)]"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>

          {product.brand && (
            <p className="text-neutral-400 mb-1 text-sm">
              Marca: <span className="text-neutral-300">{product.brand}</span>
            </p>
          )}

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-3 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.round(product.rating) ? "currentColor" : "none"}
                />
              ))}
              <span className="text-neutral-400 text-sm">
                ({product.rating.toFixed(1)})
              </span>
            </div>
          )}

          {/* Precio */}
          <div className="flex items-center gap-3 mb-4">
            <p className="text-3xl text-[var(--primary)] font-semibold">
              ${product.price.toFixed(2)}
            </p>
            {product.oldPrice && (
              <p className="text-neutral-500 line-through text-lg">
                ${product.oldPrice.toFixed(2)}
              </p>
            )}
          </div>

          {/* Variantes */}
          {product.variantGroups?.length > 0 && (
            <div className="mb-6 space-y-4">
              {product.variantGroups.map((group) => (
                <div key={group.name}>
                  <h3 className="text-sm text-neutral-400 mb-2 capitalize">
                    Selecciona {group.name}:
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {group.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleSelect(group.name, option.label)}
                        className={`border px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 ${
                          selectedOptions[group.name] === option.label
                            ? "border-[var(--primary)] bg-[var(--primary)]/10"
                            : "border-neutral-700 hover:border-[var(--primary)]"
                        }`}
                      >
                        {option.image && (
                          <Image
                            src={option.image}
                            alt={option.label}
                            width={30}
                            height={30}
                            className="rounded-md object-cover"
                          />
                        )}
                        <span>{option.label}</span>
                        {selectedOptions[group.name] === option.label && (
                          <Check size={16} className="text-[var(--primary)]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stock */}
          <p
            className={`text-sm mb-4 ${
              product.stock > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {product.stock > 0
              ? product.stock < 10
                ? `🔥 Solo quedan ${product.stock} unidades`
                : `En stock (${product.stock})`
              : "Sin stock disponible"}
          </p>

          {/* Descripción */}
          <p className="text-neutral-300 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Botón principal */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium transition ${
              added
                ? "bg-green-500 text-black"
                : product.stock <= 0
                ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                : "bg-[var(--primary)] text-black hover:bg-cyan-300"
            }`}
          >
            <ShoppingCart size={18} />
            {added
              ? "Agregado"
              : Object.keys(selectedOptions).length > 0
              ? "Añadir al carrito"
              : "Selecciona opciones"}
          </button>

          {/* 🔹 Puntos destacados */}
          <ul className="mt-6 text-sm text-neutral-300 space-y-2">
            <li className="flex items-center gap-2">
              <Truck size={16} className="text-[var(--primary)]" />
              Envío gratis a todo el país
            </li>
            <li className="flex items-center gap-2">
              <CreditCard size={16} className="text-[var(--primary)]" />
              Pago 100 % seguro y protegido
            </li>
          </ul>

          <Link
            href="/"
            className="mt-8 inline-block text-sm text-neutral-400 hover:text-[var(--primary)] transition"
          >
            ← Volver a la tienda
          </Link>
        </div>
      </div>

      {/* Productos relacionados */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-[var(--primary)] mb-6">
            También te puede interesar
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.03 }}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 hover:border-[var(--primary)] transition"
              >
                <Link href={`/product/${p.slug}`}>
                  <div className="aspect-square relative mb-3 overflow-hidden rounded-lg">
                    <Image
                      src={p.image || p.images?.[0] || "/images/placeholder.png"}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-sm font-medium line-clamp-1">{p.name}</h3>
                  <p className="text-[var(--secondary)] text-sm mt-1">
                    ${p.price.toFixed(2)}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
