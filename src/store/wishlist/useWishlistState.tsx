import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistState {
  preferences: number[];
  toggleWishlistItem: (id: number) => void;
  setWishlist: (ids: number[]) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      preferences: [],

      toggleWishlistItem: (id) => {
        const current = get().preferences;
        const updated = current.includes(id)
          ? current.filter((item) => item !== id)
          : [...current, id];
        set({ preferences: updated });
      },

      setWishlist: (ids) => {
        set({ preferences: ids });
      },

      clearWishlist: () => {
        set({ preferences: [] });
      },
    }),
    {
      name: "wishlist",
    }
  )
);
