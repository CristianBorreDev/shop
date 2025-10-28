"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/shop/ProductGrid";
import ProductFilters from "@/components/shop/ProductFilters";
import { Product } from "@/types/product";

export default function CategoryClient({
  slug,
  sub,
  products,
}: {
  slug: string;
  sub: string;
  products: Product[];
}) {
  // decodificamos los valores
  const decodedSlug = decodeURIComponent(slug || "");
  const decodedSub = decodeURIComponent(sub || "");

  // leemos sort desde searchParams
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? "none";

  const filteredAndSorted = useMemo(() => {
    let list = products;

    // filtro por categoria/sub
    if (!(decodedSlug.toLowerCase() === "all" || decodedSlug.toLowerCase() === "todos")) {
      list = list.filter(
        (p) =>
          p.category.toLowerCase() === decodedSlug.toLowerCase() &&
          (decodedSub ? (p.subcategory ?? "").toLowerCase() === decodedSub.toLowerCase() : true)
      );
    }

    // ordenar
    const copy = [...list];
    switch (sort) {
      case "price-asc":
        copy.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        copy.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        copy.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        copy.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // no ordering (preserve original)
        break;
    }

    return copy;
  }, [products, decodedSlug, decodedSub, sort]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-[var(--primary)] capitalize">
        {decodedSlug === "all" || decodedSlug === "todos" ? "Todos los productos" : decodedSlug}
        {decodedSub && ` / ${decodedSub}`}
      </h1>

      <ProductFilters currentCategory={decodedSlug} currentSub={decodedSub || ""} />

      <ProductGrid products={filteredAndSorted} />
    </div>
  );
}
