export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  subcategory?: string;   // ✅ opcional
  description?: string;
  featured?: boolean;
}
