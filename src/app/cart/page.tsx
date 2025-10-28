"use client";
import { useCartStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCartStore();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <section className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-[var(--primary)]">
        Tu Carrito 🛒
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-neutral-400 py-20">
          <p className="mb-6">Tu carrito está vacío.</p>
          <Link
            href="/"
            className="bg-[var(--primary)] text-black px-4 py-2 rounded-lg hover:bg-cyan-300"
          >
            Volver a la tienda
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-[var(--accent)] border border-neutral-800 rounded-xl p-4"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-neutral-400">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-400 hover:text-red-300"
              >
                Quitar
              </button>
            </div>
          ))}

          {/* Total */}
          <div className="flex items-center justify-between border-t border-neutral-800 pt-4 mt-4">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-lg font-semibold text-[var(--primary)]">
              ${total.toFixed(2)}
            </p>
          </div>

          {/* Acciones */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={clearCart}
              className="border border-neutral-700 text-neutral-400 px-4 py-2 rounded-lg hover:bg-neutral-800"
            >
              Vaciar carrito
            </button>
            <button className="bg-[var(--primary)] text-black px-4 py-2 rounded-lg hover:bg-cyan-300">
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
