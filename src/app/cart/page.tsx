"use client";

import { useCartStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { CartItem } from "@/types/cart";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCartStore();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const envioGratis = subtotal >= 50; // ejemplo: envío gratis desde $50
  const envio = envioGratis ? 0 : 5.99;
  const total = subtotal + envio;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-8 text-[var(--primary)] flex items-center gap-2">
        <ShoppingBag size={26} /> Tu Carrito
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-neutral-400 py-20">
          <p className="mb-6 text-lg">Tu carrito está vacío.</p>
          <Link
            href="/"
            className="bg-[var(--primary)] text-black px-5 py-2.5 rounded-lg hover:bg-cyan-300 transition font-medium"
          >
            Volver a la tienda
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* 🧾 Lista de productos */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {cart.map((item: CartItem) => {

              const variantAttrs = item.variant?.attributes
                ? Object.entries(item.variant.attributes)
                  .map(([k, v]) => `${k}: ${v}`)
                  .join(" • ")
                : null;

              return (
                <motion.div
                  key={`${item.product.id}-${item.variant?.id || "default"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col sm:flex-row items-center sm:items-start justify-between bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5 gap-4 hover:border-[var(--primary)] transition"
                >
                  {/* Imagen */}
                  <div className="relative w-28 h-28 flex-shrink-0">
                    <Image
                      src={
                        item.product.image ||
                        item.product.images?.[0] ||
                        "/images/placeholder.png"
                      }
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-xl border border-neutral-700"
                    />
                  </div>

                  {/* Información */}
                  <div className="flex-1 w-full">
                    <h3 className="text-lg font-semibold mb-1 text-white">
                      {item.product.name}
                    </h3>

                    <p className="text-xs text-neutral-500 mb-2">
                      {item.product.brand && `${item.product.brand} • `}
                      {item.product.category}
                      {item.product.subcategory && ` / ${item.product.subcategory}`}
                    </p>

                    {/* Variantes */}
                    {variantAttrs && (
                      <p className="text-sm text-neutral-300 mb-2">
                        {variantAttrs}
                      </p>
                    )}

                    {/* Precio unitario */}
                    <p className="text-[var(--primary)] text-lg font-semibold mb-1">
                      ${item.product.price.toFixed(2)}{" "}
                      <span className="text-sm text-neutral-400 font-normal">
                        / unidad
                      </span>
                    </p>

                    {/* Controles */}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2 border border-neutral-700 rounded-lg px-2 py-1">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.variant?.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="p-1 hover:text-[var(--primary)]"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-6 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.variant?.id,
                              item.quantity + 1
                            )
                          }
                          className="p-1 hover:text-[var(--primary)]"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(item.product.id, item.variant?.id)
                        }
                        className="flex items-center gap-1 text-red-400 hover:text-red-300 transition text-sm"
                      >
                        <Trash2 size={16} /> Quitar
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right sm:ml-4">
                    <p className="text-neutral-400 text-sm">Subtotal</p>
                    <p className="text-xl font-semibold text-[var(--primary)]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 💰 Resumen */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Resumen de compra
            </h2>

            <div className="space-y-3 text-sm text-neutral-300 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span className={envioGratis ? "text-green-400" : ""}>
                  {envioGratis ? "Gratis" : `$${envio.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-neutral-700 pt-3 flex justify-between font-semibold text-white text-base">
                <span>Total</span>
                <span className="text-[var(--primary)]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/checkout"
                className="bg-[var(--primary)] text-center text-black px-6 py-2.5 rounded-lg font-medium hover:bg-cyan-300 transition"
              >
                Finalizar compra
              </Link>

              <Link
                href="/category/all"
                className="text-center border border-neutral-700 text-neutral-400 px-6 py-2.5 rounded-lg hover:bg-neutral-800 transition"
              >
                Seguir comprando
              </Link>

              <button
                onClick={clearCart}
                className="text-sm text-red-400 hover:text-red-300 transition mt-2"
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
