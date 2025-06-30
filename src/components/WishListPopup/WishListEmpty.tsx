import { useTranslation } from "react-i18next";
import s from "./WishListPopup.module.css";

export const WishListEmpty: React.FC = () => {
  const { t } = useTranslation();

  return <div className={s.emptyWishlist}>{t("wishlistPopup.empty")}</div>;
};
