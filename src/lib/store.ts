import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

interface CartState {
  cart: Product[];
  hasHydrated: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
      addToCart: (product) => {
        const currentCart = get().cart;
        if (!currentCart.find((p) => p.id === product.id)) {
          set({ cart: [...currentCart, product] });
        }
      },
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
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
