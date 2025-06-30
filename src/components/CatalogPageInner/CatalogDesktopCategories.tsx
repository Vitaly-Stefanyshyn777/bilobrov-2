import React from "react";
import type { CategoryShort } from "@/types/categoryShortType";
import s from "./CatalogDesktopCategories.module.css";

interface CatalogDesktopCategoriesProps {
  childCategories: CategoryShort[];
  selectedCategories: string[];
  onTabClick: (id: number, slug: string) => void;
}

export const CatalogDesktopCategories: React.FC<
  CatalogDesktopCategoriesProps
> = ({ childCategories, selectedCategories, onTabClick }) => (
  <div className={s.childCategories}>
    <ul>
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
