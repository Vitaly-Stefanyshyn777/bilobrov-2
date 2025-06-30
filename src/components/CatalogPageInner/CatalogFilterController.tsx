import React from "react";
import { CustomSortDropdown } from "@/components/DropDown/DropDown";
import s from "./CatalogFilterController.module.css";
import { FilterIcon } from "../Icon/Icon";

interface CatalogFilterControllerProps {
  onOpenFilters: () => void;
  sort: string;
  t: (key: string) => string;
}

export const CatalogFilterController: React.FC<
  CatalogFilterControllerProps
> = ({ onOpenFilters, sort, t }) => (
  <div className={s.filterController}>
    <button onClick={onOpenFilters}>
      <FilterIcon />
      {t("catalog.filters")}
    </button>
    <div className={s.sort}>
      <CustomSortDropdown sort={sort} />
    </div>
  </div>
);
