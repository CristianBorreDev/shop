// src/components/shop/ProductListClient.tsx
"use client";
import ProductList from "./ProductList";

export default function ProductListClient({ category }: { category: string | null }) {
  return <ProductList category={category} />;
}
