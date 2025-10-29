/** ============================================================
 * 🧱 TIPO PRINCIPAL: Product
 * Estructura estándar de un producto en la tienda online.
 * ============================================================ */
export interface Product {
  id: number;                          // Identificador único
  name: string;                        // Nombre del producto
  slug: string;                        // URL amigable (ej: "auriculares-inalambricos-pro")
  price: number;                       // Precio base
  oldPrice?: number;                   // Precio anterior (para descuentos)
  images: string[];                    // Galería de imágenes
  image?: string;                      // Imagen principal (opcional)
  category: string;                    // Categoría principal
  subcategory?: string;                // Subcategoría
  brand?: string;                      // Marca
  stock: number;                       // Stock general (si no hay variantes)
  featured?: boolean;                  // Si es destacado
  description: string;                 // Descripción larga
  shortDescription?: string;           // Descripción corta
  specifications?: any; // Ficha técnica
  variantGroups?: VariantGroup[];      // Grupos de variantes (Color, Talla, etc.)
  variants?: Variant[];                // Combinaciones finales de variantes
  tags?: string[];                     // Palabras clave
  rating: number;                      // Calificación promedio
  reviews?: Review[];                  // Reseñas
  createdAt?: string;                  // Fecha de creación
  updatedAt?: string;                  // Fecha de última actualización
}

/** ============================================================
 * 🎨 GRUPO DE VARIANTES
 * Define los tipos de opciones que puede tener el producto.
 * Ejemplo: Color (Rojo, Azul), Talla (S, M, L)
 * ============================================================ */
export interface VariantGroup {
  name: string;                        // Ej: "Color" o "Talla"
  options: VariantOption[];            // Opciones disponibles dentro del grupo
}

/** ============================================================
 * 🧩 OPCIÓN DE VARIANTE
 * Una opción dentro de un grupo (ej: "Rojo", "M", etc.)
 * ============================================================ */
export interface VariantOption {
  id: string;                          // Identificador único de la opción
  label: string;                       // Nombre visible ("Rojo", "M", etc.)
  image?: string;                      // Imagen de muestra (si aplica)
  colorHex?: string;                   // Para mostrar visualmente el color
}

/** ============================================================
 * 🧬 VARIANTE FINAL (COMBINACIÓN)
 * Representa una combinación única de atributos (Color + Talla)
 * ============================================================ */
export interface Variant {
  id: string;                          // Identificador único
  attributes: Record<string, string>;  // Ej: { Color: "Rojo", Talla: "M" }
  price?: number;                      // Precio distinto (opcional)
  stock?: number;                      // Stock de esa combinación
  image?: string;                      // Imagen específica
}

/** ============================================================
 * ⭐ Reseñas de usuarios
 * ============================================================ */
export interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

/** ============================================================
 * 🛒 Tipos auxiliares para carrito o UI
 * ============================================================ */
export interface CartItem {
  product: Product;                    // Producto base
  quantity: number;                    // Cantidad
  variant?: Variant;                   // Variante seleccionada (combinada)
}

/** ============================================================
 * 🧭 Categorías dinámicas
 * ============================================================ */
export type CategoryMap = {
  [category: string]: string[];
};
