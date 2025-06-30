"use client";
import { useRouter, usePathname } from "next/navigation";
import { useProductFilterStore } from "@/store/filter/useProductFilterStore";
import type { CategoryShort } from "@/types/categoryShortType";

interface FilterPopupNavigationProps {
  localMinPrice: number;
  localMaxPrice: number;
  localOnSale: boolean;
  localInStock: boolean;
  localSelectedCategories: string[];
  localSelectedBrands: string[];
  localSelectedAttributes: Record<string, string[]>;
  onClose: () => void;
}

export const useFilterPopupNavigation = ({
  localMinPrice,
  localMaxPrice,
  localOnSale,
  localInStock,
  localSelectedCategories,
  localSelectedBrands,
  localSelectedAttributes,
  onClose,
}: FilterPopupNavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { allCategories } = useProductFilterStore();

  const applyFilters = () => {
    const currentParams = new URLSearchParams(window.location.search);

    currentParams.set("min", localMinPrice.toString());
    currentParams.set("max", localMaxPrice.toString());
    currentParams.set("sale", localOnSale.toString());
    currentParams.set("stock", localInStock.toString());

    if (localSelectedCategories.length) {
      currentParams.set("categories", localSelectedCategories.join(","));
    } else {
      currentParams.delete("categories");
    }

    if (localSelectedBrands.length) {
      currentParams.set("brand", localSelectedBrands.join(","));
    } else {
      currentParams.delete("brand");
    }

    Object.entries(localSelectedAttributes).forEach(([slug, optionIds]) => {
      if (optionIds.length > 0) {
        currentParams.set(`attr_${slug}`, optionIds.join(","));
      } else {
        currentParams.delete(`attr_${slug}`);
      }
    });

    let navPathname = "/catalog";
    if (
      localSelectedCategories.length === 1 &&
      allCategories &&
      allCategories.length > 0
    ) {
      const matchedCategory = allCategories.find(
        (cat: CategoryShort) => cat.id.toString() === localSelectedCategories[0]
      );
      if (matchedCategory?.slug) {
        navPathname += `/${matchedCategory.slug}`;
      }
    }


    router.push(`${navPathname}?${currentParams.toString()}`);
    onClose();
  };

  const resetFilters = () => {
    router.push(pathname);
    onClose();
  };

  return {
    applyFilters,
    resetFilters,
  };
};
