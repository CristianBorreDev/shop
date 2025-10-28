import products from "@/data/products.json";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";

export default function ProductList() {
  return (
    <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p: Product) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
