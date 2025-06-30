import React from "react";
import s from "./FilterPopup.module.css";
import { useTranslation } from "react-i18next";

interface FilterApplyButtonProps {
  onApply: () => void;
}

export const FilterApplyButton: React.FC<FilterApplyButtonProps> = ({
  onApply,
}) => {
  const { t } = useTranslation();
  return (
    <button className={s.btn} onClick={onApply}>
      {t("catalog.applyFilters")}
    </button>
  );
};
