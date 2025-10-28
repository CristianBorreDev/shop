import products from "@/data/products.json";
import { Product } from "@/types/product";

export interface Category {
  [category: string]: string[];
}

export const getCategories = (): Category => {
  const map: Category = {};
  for (const p of products as Product[]) {
    const category = p.category;
    const subcategory = p.subcategory || null; // puede no existir

    if (!map[category]) {
      map[category] = [];
    }

    if (subcategory && !map[category].includes(subcategory)) {
      map[category].push(subcategory);
    }
  }
  return map;
};
