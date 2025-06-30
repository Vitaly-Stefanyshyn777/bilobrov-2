import React from "react";
import type { CategoryShort } from "@/types/categoryShortType";
import s from "./CatalogMobileCategories.module.css";

interface CatalogMobileCategoriesProps {
  childCategories: CategoryShort[];
  selectedCategories: string[];
  onTabClick: (id: number, slug: string) => void;
}

export const CatalogMobileCategories: React.FC<
  CatalogMobileCategoriesProps
> = ({ childCategories, selectedCategories, onTabClick }) => (
  <div className={s.childCategories}>
    <ul className={s.scroller}>
      {childCategories.map((cat) => (
        <li
          key={cat.id}
          className={
            selectedCategories.includes(cat.id.toString()) ? s.active : ""
          }
          onClick={() => onTabClick(cat.id, cat.slug)}
        >
          {cat.name}
        </li>
      ))}
    </ul>
  </div>
);
