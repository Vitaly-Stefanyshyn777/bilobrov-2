import React from "react";
import s from "./FilterPopup.module.css";
import { useTranslation } from "react-i18next";

interface FilterSwitchControllerProps {
  onSale: boolean;
  inStock: boolean;
  setOnSale: (v: boolean) => void;
  setInStock: (v: boolean) => void;
}

export const FilterSwitchController: React.FC<FilterSwitchControllerProps> = ({
  onSale,
  inStock,
  setOnSale,
  setInStock,
}) => {
  const { t } = useTranslation();
  return (
    <div className={s.switchController}>
      <label>
        {t("catalog.filterSale")}
        <input
          className={s.switch}
          type="checkbox"
          checked={onSale}
          onChange={() => setOnSale(!onSale)}
        />
      </label>
      <label>
        {t("catalog.filterInStock")}
        <input
          className={s.switch}
          type="checkbox"
          checked={inStock}
          onChange={() => setInStock(!inStock)}
        />
      </label>
    </div>
  );
};
