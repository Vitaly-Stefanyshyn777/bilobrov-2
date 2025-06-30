import React from "react";
import s from "./FilterPopupHeader.module.css";
import { useTranslation } from "react-i18next";

interface FilterPopupHeaderProps {
  onClose: () => void;
}

export const FilterPopupHeader: React.FC<FilterPopupHeaderProps> = ({
  onClose,
}) => {
  const { t } = useTranslation();
  return (
    <div className={s.menuHeader}>
      <p>{t("catalog.filters")}</p>
      <button className={s.closeButton} onClick={onClose} aria-label="Закрити">
        &times;
      </button>
    </div>
  );
};
