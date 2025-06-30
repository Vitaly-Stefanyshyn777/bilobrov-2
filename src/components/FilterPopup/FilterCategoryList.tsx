import React from "react";
import s from "./FilterPopup.module.css";
import type { CategoryShort } from "@/types/categoryShortType";
import { SearchIcon2 } from "../Icon/Icon";

interface FilterCategoryListProps {
  categories: CategoryShort[];
  selectedCategories: string[];
  categorySearch: string;
  setCategorySearch: (v: string) => void;
  toggleCategory: (id: string) => void;
}

export const FilterCategoryList: React.FC<FilterCategoryListProps> = ({
  categories,
  selectedCategories,
  categorySearch,
  setCategorySearch,
  toggleCategory,
}) => {
  return (
    <>
      {categories.length > 20 && (
        <div className={s.inputContainer}>
          <input
            type="text"
            className={s.searchInput}
            placeholder="Пошук категорії"
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value.toLowerCase())}
          />
          <SearchIcon2 />
        </div>
      )}
      {categories
        .filter((cat) => cat.name.toLowerCase().includes(categorySearch))
        .map((cat) => (
          <label key={cat.id} className={s.customCheckbox}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat.id.toString())}
              onChange={() => toggleCategory(cat.id.toString())}
              className={s.hiddenCheckbox}
            />
            <span className={s.checkboxLabel}>{cat.name}</span>
          </label>
        ))}
    </>
  );
};
