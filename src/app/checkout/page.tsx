"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Check } from "lucide-react";
import Image from "next/image";
import { CartItem } from "@/types/cart";
import OrderConfirmationModal from '@/components/checkout/OrderConfirmationModal'

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postal: "",
    country: "",
    payment: "tarjeta",
  });
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const envioGratis = subtotal >= 50;
  const envio = envioGratis ? 0 : 5.99;
  const total = subtotal + envio;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleNextStep = () => {
    // Validación mínima
    if (!form.name || !form.email || !form.address || !form.city || !form.postal || !form.country) {
      alert("Por favor completa todos los campos.");
      return;
    }
    setStep(2);
  };

  const handleConfirmOrder = () => {
    // Simular confirmación con animación
    setOrderConfirmed(true);
    clearCart();
    setTimeout(() => {
      setOrderConfirmed(false);
      window.location.href = "/"; // volver a inicio
    }, 4000);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-8 text-[var(--primary)] flex items-center gap-2">
        <ShoppingBag size={28} /> Checkout
      </h1>

      {/* ✅ Modal animación pedido */}
      {orderConfirmed && <OrderConfirmationModal onClose={() => setOrderConfirmed(false)} />}

      {/* Paso 1: Formulario */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Tus datos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={form.name}
              onChange={handleChange}
              className="p-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              className="p-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
            />
            <input
              type="text"
              name="address"
              placeholder="Dirección"
              value={form.address}
              onChange={handleChange}
              className="p-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white col-span-2"
            />
            <input
              type="text"
              name="city"
              placeholder="Ciudad"
              value={form.city}
              onChange={handleChange}
              className="p-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
            />
            <input
              type="text"
              name="postal"
              placeholder="Código postal"
              value={form.postal}
              onChange={handleChange}
              className="p-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
            />
            <input
              type="text"
              name="country"
              placeholder="País"
              value={form.country}
              onChange={handleChange}
              className="p-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
            />
          </div>

          <div className="mt-4">
            <label className="block mb-1 text-white">Método de pago:</label>
            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
              className="p-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white w-full"
            >
              <option value="tarjeta">Tarjeta de crédito/débito</option>
              <option value="transferencia">Transferencia</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          <button
            onClick={handleNextStep}
            className="bg-[var(--primary)] text-black px-6 py-2.5 rounded-lg font-medium hover:bg-cyan-300 transition mt-4"
          >
            Siguiente
          </button>
        </motion.div>
      )}

      {/* Paso 2: Resumen y confirmación */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h2 className="text-xl font-semibold text-white">Resumen del pedido</h2>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
            {cart.map((item: CartItem) => (
              <div key={`${item.product.id}-${item.variant?.id || "default"}`} className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.product.image || item.product.images?.[0] || "/images/placeholder.png"}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-xl border border-neutral-700"
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.product.name}</p>
                    <p className="text-neutral-400 text-sm">
                      {item.quantity} x ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <p className="text-[var(--primary)] font-semibold">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            <div className="border-t border-neutral-700 pt-4 space-y-2 text-sm text-neutral-300">
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
              <div className="flex justify-between font-semibold text-white text-lg">
                <span>Total</span>
                <span className="text-[var(--primary)]">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleConfirmOrder}
            className="bg-[var(--primary)] text-black px-6 py-2.5 rounded-lg font-medium hover:bg-cyan-300 transition"
          >
            Confirmar pedido
          </button>

          <button
            onClick={() => setStep(1)}
            className="text-sm ml-6 text-neutral-400 hover:underline mt-2"
          >
            Volver al formulario
          </button>
        </motion.div>
      )}
    </section>
  );
}
