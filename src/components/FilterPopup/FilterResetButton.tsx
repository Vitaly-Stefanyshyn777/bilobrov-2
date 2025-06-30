import React from "react";
import s from "./FilterPopup.module.css";
import { useTranslation } from "react-i18next";

interface FilterResetButtonProps {
  onReset: () => void;
}

export const FilterResetButton: React.FC<FilterResetButtonProps> = ({
  onReset,
}) => {
  const { t } = useTranslation();
  return (
    <button onClick={onReset} className={s.resetFilters}>
      {t("reset")}
    </button>
  );
};
