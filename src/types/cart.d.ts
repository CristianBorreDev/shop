import type { Product } from "@/types/product";

export interface CartItem {
  product: Product;                  // Producto base
  quantity: number;                  // Cantidad seleccionada
  variant?: Pick<Variant, "id" | "attributes" >; // Variante elegida
}