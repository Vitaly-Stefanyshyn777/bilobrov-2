import { useTranslation } from "react-i18next";
import s from "./WishListPopup.module.css";
import {
  CloseIcon,
  TrashIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "../Icon/Icon";

interface WishListHeaderProps {
  isMobile: boolean;
  onClose: () => void;
  productsCount: number;
  onClear: () => void;
}

export const WishListHeader: React.FC<WishListHeaderProps> = ({
  isMobile,
  onClose,
  productsCount,
  onClear,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={s.swiperController}>
        {isMobile ? (
          <>
            <h2>{t("wishlistPopup.titleMobile")}</h2>
            {productsCount > 0 && (
              <button className={s.clear} onClick={onClear}>
                <TrashIcon />
                <span>{t("deleteAll")}</span>
              </button>
            )}
          </>
        ) : (
          <h2>
            <span>{t("wishlistPopup.titleDesktopPart1")}</span>
            <span>{t("wishlistPopup.titleDesktopPart2")}</span>
          </h2>
        )}

        {productsCount > 0 && !isMobile && (
          <div className={s.navigationContainer}>
            <button className={s.prevButton}>
              <ArrowLeftIcon />
            </button>
            <button className={s.nextButton}>
              <ArrowRightIcon />
            </button>
          </div>
        )}
      </div>

      <button onClick={onClose} className={s.closeBtn}>
        <CloseIcon />
      </button>
    </>
  );
};
