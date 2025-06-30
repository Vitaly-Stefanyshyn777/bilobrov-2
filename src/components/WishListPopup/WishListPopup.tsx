// потрібно;
import s from "./WishListPopup.module.css";
import { motion } from "framer-motion";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useCartProductsQuery } from "@/queries/useAllProductsQuery";
import { Loader } from "../Loader/Loader";
import "./WishList.css";
import { useWishlistStore } from "@/store/wishlist/useWishlistState";
import type { WishlistState } from "@/store/wishlist/useWishlistState";
import { WishListHeader } from "./WishListHeader";
import { WishListContent } from "./WishListContent";
import { WishListEmpty } from "./WishListEmpty";

const WishListPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { width } = useWindowSize();
  const isMobile = width < 1024;
  const wishlist = useWishlistStore(
    (state: WishlistState) => state.preferences
  );
  const clearWishlist = useWishlistStore(
    (state: WishlistState) => state.clearWishlist
  );

  const { data: cartProducts = [], isLoading: loading } =
    useCartProductsQuery(wishlist);

  const handleClearWishlist = () => {
    clearWishlist();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={s.modalOverlay}
    >
      <motion.div
        className={s.modal}
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <WishListHeader
          isMobile={isMobile}
          onClose={onClose}
          productsCount={cartProducts.length}
          onClear={handleClearWishlist}
        />

        {loading ? (
          <Loader />
        ) : cartProducts.length > 0 ? (
          <WishListContent
            products={cartProducts}
            isMobile={isMobile}
            onClear={handleClearWishlist}
          />
        ) : (
          <WishListEmpty />
        )}
      </motion.div>
    </motion.div>
  );
};

export default WishListPopup;
