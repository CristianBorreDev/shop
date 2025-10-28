"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function Navbar() {
  const cartCount = useCartStore((s) => s.cart.length);

  return (
    <header className="sticky top-0 z-50 bg-[var(--accent)] border-b border-neutral-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-[var(--primary)]">
          Shop<span className="text-[var(--secondary)]">MVP</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="hover:text-[var(--primary)]">
            Inicio
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[var(--primary)] text-black text-xs rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
