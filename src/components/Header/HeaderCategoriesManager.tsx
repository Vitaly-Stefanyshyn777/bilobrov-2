"use client";
import { useMemo } from "react";
import { useProductFilterStore } from "../../store/filter/useProductFilterStore";

export const useHeaderCategoriesManager = () => {
  const categories = useProductFilterStore((s) => s.allCategories);

  const menuCategoryNames = useMemo(
    () => [
      "Акції",
      "Волосся",
      "Декоративна косметика",
      "Новинки",
      "Обличчя",
      "Вітаміни",
      "Тіло",
    ],
    []
  );

  const uniqueCategories = useMemo(() => {
    const unique = [];
    const names = new Set();

    for (const cat of categories) {
      if (menuCategoryNames.includes(cat.name) && !names.has(cat.name)) {
        unique.push(cat);
        names.add(cat.name);
      }
    }

    return unique;
  }, [categories, menuCategoryNames]);

  return {
    uniqueCategories,
  };
};
