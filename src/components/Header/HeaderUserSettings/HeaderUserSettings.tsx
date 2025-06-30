import s from "./HeaderUserSettings.module.css";
import { useEffect, useState } from "react";
import { useWishlistStore } from "@/store/wishlist/useWishlistState";
import { CartIcon, HeartIcon, UserIcon } from "@/components/Icon/Icon";

interface HeaderUserSettingsProps {
  openRegister: React.Dispatch<React.SetStateAction<boolean>>;
  openWishList: () => void;
  isMobile: boolean;
}

export const HeaderUserSettings: React.FC<HeaderUserSettingsProps> = ({
  openRegister,
  openWishList,
  isMobile,
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const wishlist = useWishlistStore((state) => state.preferences);

  if (!mounted) return null;

  return (
    <div className={s.userSettings}>
      {!isMobile && (
        <button onClick={() => openRegister(true)}>
          <UserIcon />
        </button>
      )}

      <button
        className={!wishlist.length ? s.disabled : ""}
        onClick={() => openWishList()}
      >
        <HeartIcon />

        {wishlist?.length > 0 && (
          <span className={s.qty}>{wishlist?.length}</span>
        )}
      </button>

      <button className={s.cartBtn} title="Кошик (заглушка)" disabled>
        <CartIcon />
      </button>
    </div>
  );
};
