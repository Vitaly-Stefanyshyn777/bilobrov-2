import React from "react";
import { useWishlistStore } from "@/store/wishlist/useWishlistState";
import s from "./WishListBtn.module.css";
import { HeartIcon } from "../Icon/Icon";
import { shallow } from "zustand/shallow";
import { useStore } from "zustand";

interface WishlistButtonProps {
  productId: number;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ productId }) => {
  const isInWishlist = useWishlistStore((state) =>
    state.preferences.includes(productId)
  );
  const toggleWishlistItem = useWishlistStore(
    (state) => state.toggleWishlistItem
  );

  return (
    <div className={s.wishList} onClick={() => toggleWishlistItem(productId)}>
      <HeartIcon isActive={isInWishlist} />
    </div>
  );
};

export default WishlistButton;
