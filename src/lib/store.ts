import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

interface CartState {
  cart: CartItem[];
  hasHydrated: boolean;
  addToCart: (product: Product, variant?: CartItem["variant"]) => void;
  removeFromCart: (productId: number, variantId?: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: number, variantId: string | undefined, quantity: number) => void;
  setHasHydrated: (state: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      hasHydrated: false,

      setHasHydrated: (state) => set({ hasHydrated: state }),

      addToCart: (product, variant) => {
        const { cart } = get();

        const existing = cart.find(
          (item) =>
            item.product.id === product.id &&
            item.variant?.id === variant?.id
        );

        if (existing) {
          set({
            cart: cart.map((item) =>
              item.product.id === product.id &&
              item.variant?.id === variant?.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            cart: [
              ...cart,
              {
                product,
                variant,
                quantity: 1,
              },
            ],
          });
        }
      },

      removeFromCart: (productId, variantId) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.variant?.id === variantId
              )
          ),
        })),

      updateQuantity: (productId, variantId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId &&
            item.variant?.id === variantId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "shop-cart",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
