import { CustomSortDropdown } from "@/components/DropDown/DropDown";
import React from "react";

interface CatalogHeaderProps {
  pageTitle: string;
  totalCount: number;
  t: (key: string) => string;
  sort: string;
}

export const CatalogHeader: React.FC<CatalogHeaderProps> = ({
  pageTitle,
  totalCount,
  t,
  sort,
}) => (
  <div className="categoryHeader">
    <h1>{pageTitle}</h1>
    <span>
      {totalCount} {t("catalog.productsLength")}
    </span>
    <div className="sort">
      <CustomSortDropdown sort={sort} />
    </div>
  </div>
);
