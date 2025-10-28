import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import products from "@/data/products.json";

interface Props {
  category?: string | null;
  limit?: number | null;
}

export default function ProductList({ category = null, limit = null }: Props) {
  let list = products as Product[];
  if (category) {
    list = list.filter((p) => p.category === category);
  }
  if (limit) {
    list = list.slice(0, limit);
  }

  if (list.length === 0) {
    return <p className="text-neutral-400">No hay productos para esta categoría.</p>;
  }

  return (
    <div id="productos" className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {list.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
