import React from "react";
import s from "./FilterPopup.module.css";
import type { Brand } from "@/types/productTypes";
import { SearchIcon2 } from "../Icon/Icon";

interface FilterBrandListProps {
  brands: Brand[];
  selectedBrands: string[];
  brandSearch: string;
  setBrandSearch: (v: string) => void;
  toggleBrand: (id: string) => void;
}

export const FilterBrandList: React.FC<FilterBrandListProps> = ({
  brands,
  selectedBrands,
  brandSearch,
  setBrandSearch,
  toggleBrand,
}) => {
  return (
    <>
      {brands.length > 20 && (
        <div className={s.inputContainer}>
          <input
            type="text"
            className={s.searchInput}
            placeholder="Пошук бренду"
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value.toLowerCase())}
          />
          <SearchIcon2 />
        </div>
      )}
      {brands
        .filter((brand) => brand.name.toLowerCase().includes(brandSearch))
        .map((brand) => (
          <label key={brand.id} className={s.customCheckbox}>
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand.id.toString())}
              onChange={() => toggleBrand(brand.id.toString())}
              className={s.hiddenCheckbox}
            />
            <span className={s.checkboxLabel}>{brand.name}</span>
          </label>
        ))}
    </>
  );
};
