import { use } from "react";
import productsData from "@/data/products.json";
import CategoryClient from "./CategoryClient";

export default function CategoryPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sub?: string, q?: string }>;
}) {
  const { slug } = use(props.params);
  const { sub, q } = use(props.searchParams);

  const products = Array.isArray(productsData) ? productsData : [];

  return (
    <CategoryClient slug={slug} sub={sub ?? ""} query={q ?? ""} products={products} />
  );
}
