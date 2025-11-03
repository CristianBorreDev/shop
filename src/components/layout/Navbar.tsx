"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, ChevronDown, ChevronRight, Search } from "lucide-react";
import { getCategories } from "@/lib/categories";
import { useCartStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const categories = getCategories(); // { [category]: [subcategories] }
  const { cart, hasHydrated } = useCartStore();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false); // para mobile
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/category/all?q=${encodeURIComponent(search.trim())}`);
    setSearch("");
    setShowSearch(false);
  };

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
              className="flex cursor-pointer items-center gap-1 hover:text-[var(--primary)]"
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
                              href={`/category/${toSlug(cat)}?sub=${toSlug(
                                sub
                              )}`}
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

        {/* 🔍 BUSCADOR */}
        <div className="flex gap-5">
          <div className="flex-1 hidden md:flex justify-center">
            <form
              onSubmit={handleSearchSubmit}
              className="relative w-full max-w-xs"
            >
              <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-1.5 text-sm focus:outline-none focus:border-[var(--primary)]"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[var(--primary)]"
              >
                <Search size={16} />
              </button>
            </form>
          </div>

          {/* NAV DERECHA */}
          <nav className="flex items-center gap-6">
            <button
              onClick={() => setShowSearch((s) => !s)}
              className="md:hidden hover:text-[var(--primary)]"
              aria-label="Buscar"
            >
              {showSearch ? <X size={20} /> : <Search size={20} />}
            </button>

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
      </div>

      {/* Buscador desplegable móvil */}
      {showSearch && (
        <div className="md:hidden border-t border-neutral-800 bg-[var(--accent)] px-4 py-2">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-2 text-sm focus:outline-none focus:border-[var(--primary)]"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[var(--primary)]"
            >
              <Search size={16} />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
