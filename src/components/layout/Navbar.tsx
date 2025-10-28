"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, ChevronDown, ChevronRight } from "lucide-react";
import { getCategories } from "@/lib/categories";
import { useCartStore } from "@/lib/store";

export default function Navbar() {
  const categories = getCategories(); // { [category]: [subcategories] }
  const { cart, hasHydrated } = useCartStore();

  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  // 🔒 Cierra menús al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveCategory(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toSlug = (s: string) => encodeURIComponent(s.toLowerCase());

  return (
    <header className="sticky top-0 z-50 bg-[var(--accent)] border-b border-neutral-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold text-[var(--primary)]">
          Shop<span className="text-[var(--secondary)]">MVP</span>
        </Link>

        {/* NAV IZQUIERDA */}
        <nav className="flex items-center gap-6">
          <Link href="/" className="hover:text-[var(--primary)]">
            Inicio
          </Link>

          {/* MENU DE CATEGORÍAS */}
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-1 hover:text-[var(--primary)]"
              aria-expanded={open}
            >
              Categorías <ChevronDown size={16} />
            </button>

            {open && (
              <div
                className="absolute left-0 mt-2 min-w-56 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl z-50"
                onMouseLeave={() => setActiveCategory(null)}
              >
                {/* Opción TODOS */}
                <Link
                  href="/category/all"
                  className="block px-3 py-2 hover:bg-neutral-800"
                  onClick={() => setOpen(false)}
                >
                  Todos
                </Link>

                {/* CATEGORÍAS */}
                {Object.entries(categories).map(([cat, subs]) => {
                  const hasSubs = subs.length > 0;
                  const isActive = activeCategory === cat;

                  return (
                    <div
                      key={cat}
                      className="relative group"
                      onMouseEnter={() => hasSubs && setActiveCategory(cat)}
                      onMouseLeave={() => hasSubs && setActiveCategory(null)}
                    >
                      {/* Categoría principal */}
                      <div className="flex items-center justify-between hover:bg-neutral-800 transition-colors">
                        <Link
                          href={`/category/${toSlug(cat)}`}
                          className="block w-full px-3 py-2"
                          onClick={() => setOpen(false)}
                        >
                          {cat}
                        </Link>

                        {hasSubs && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveCategory((prev) =>
                                prev === cat ? null : cat
                              );
                            }}
                            className="p-2 hover:text-[var(--primary)]"
                          >
                            <ChevronRight
                              size={14}
                              className={`transition-transform ${
                                isActive ? "rotate-90" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Subcategorías */}
                      {hasSubs && isActive && (
                        <div className="absolute top-0 left-full ml-1 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl w-52 z-50">
                          <div className="px-3 py-2 text-xs text-neutral-400">
                            {cat}
                          </div>
                          {subs.map((sub) => (
                            <Link
                              key={sub}
                              href={`/category/${toSlug(cat)}?sub=${toSlug(sub)}`}
                              className="block px-4 py-2 text-sm hover:bg-neutral-800"
                              onClick={() => {
                                setOpen(false);
                                setActiveCategory(null);
                              }}
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* NAV DERECHA */}
        <nav className="flex items-center gap-6">
          <Link href="/cart" className="relative">
            <ShoppingCart size={22} />
            {hasHydrated && cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[var(--primary)] text-black text-xs rounded-full px-1.5">
                {cart.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
