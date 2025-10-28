"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCategories } from "@/lib/categories";

export default function ProductFilters({
  currentCategory,
  currentSub,
}: {
  currentCategory: string;
  currentSub: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categories = getCategories();

  const decodedCategory = decodeURIComponent(currentCategory || "todos");
  const decodedSub = decodeURIComponent(currentSub || "");

  // normalize helper (remove accents, lowercase)
  const normalize = (s: string) =>
    s?.normalize?.("NFD")?.replace(/[\u0300-\u036f]/g, "")?.toLowerCase() ?? "";

  const realCategoryKey =
    Object.keys(categories).find((cat) => normalize(cat) === normalize(decodedCategory)) ??
    "todos";

  const subcategories = categories[realCategoryKey] ?? [];

  const [selectedCategory, setSelectedCategory] = useState<string>(realCategoryKey);
  const [selectedSub, setSelectedSub] = useState<string>(decodedSub);

  // sync when parent props change (e.g. from navbar)
  useEffect(() => {
    setSelectedCategory(realCategoryKey);
    if (decodedSub && subcategories.some((s) => normalize(s) === normalize(decodedSub))) {
      const realSub = subcategories.find((s) => normalize(s) === normalize(decodedSub)) || "";
      setSelectedSub(realSub);
    } else {
      setSelectedSub("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory, currentSub]);

  // read current sort param (to keep the select in sync)
  const currentSort = searchParams.get("sort") ?? "none";
  const [sort, setSort] = useState<string>(currentSort);

  useEffect(() => {
    setSort(currentSort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSort]);

  function buildUrl(cat: string, sub?: string, sortParam?: string) {
    const base = `/category/${encodeURIComponent(cat)}`;
    const params = new URLSearchParams();
    if (sub) params.set("sub", sub);
    if (sortParam && sortParam !== "none") params.set("sort", sortParam);
    const q = params.toString();
    return q ? `${base}?${q}` : base;
  }

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const cat = e.target.value;
    setSelectedCategory(cat);
    setSelectedSub("");
    router.push(buildUrl(cat, undefined, sort));
  }

  function handleSubChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const s = e.target.value;
    setSelectedSub(s);
    router.push(buildUrl(selectedCategory, s || undefined, sort));
  }

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value;
    setSort(val);
    // mantener categoría y sub actuales
    router.push(buildUrl(selectedCategory, selectedSub || undefined, val));
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3">
      <div className="flex gap-2 items-center">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1 text-sm capitalize"
        >
          <option value="todos">Todos</option>
          {Object.keys(categories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {selectedCategory !== "todos" && subcategories.length > 0 && (
          <select
            value={selectedSub}
            onChange={handleSubChange}
            className="bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1 text-sm capitalize"
          >
            <option value="">Todas las subcategorías</option>
            {subcategories.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        )}
      </div>

      <select
        value={sort}
        onChange={handleSortChange}
        className="bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1 text-sm"
      >
        <option value="none">Ordenar por</option>
        <option value="price-asc">Precio: menor a mayor</option>
        <option value="price-desc">Precio: mayor a menor</option>
        <option value="name-asc">Nombre: A → Z</option>
        <option value="name-desc">Nombre: Z → A</option>
      </select>
    </div>
  );
}
