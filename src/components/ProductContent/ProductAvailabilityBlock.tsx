import s from "./ProductContent.module.css";
import { useTranslation } from "react-i18next";
import { CheckIcon } from "../Icon/Icon";

export const ProductAvailabilityBlock: React.FC<{
  stock: number;
  sku: string;
}> = ({ stock, sku }) => {
  const { t } = useTranslation();
  return (
    <div className={s.isAvailable}>
      {stock > 0 ? (
        <div className={s.available}>
          <p>
            <CheckIcon />
            {t("inStock")}
          </p>
        </div>
      ) : (
        <div className={s.available}>
          <p>{t("outOfStock")}</p>
        </div>
      )}
      <div className={s.code}>
        <p>{t("productCode")}: </p> <span>{sku}</span>
      </div>
    </div>
  );
};
