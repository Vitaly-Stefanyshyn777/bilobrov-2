"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useProductFilterStore } from "@/store/filter/useProductFilterStore";

export const useFilterPopupStateManager = () => {
  const {
    minPrice,
    maxPrice,
    onSale,
    inStock,
    selectedCategories,
    selectedBrands,
    selectedAttributes,
    attributes,
    allCategories,
    allBrands,
  } = useProductFilterStore();

  const searchParams = useSearchParams();

  // Локальний стан для фільтрів
  const [localSelectedAttributes, setLocalSelectedAttributes] = useState<
    Record<string, string[]>
  >({});
  const [openAttributes, setOpenAttributes] = useState<Record<string, boolean>>(
    {}
  );

  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
  const [localSelectedCategories, setLocalSelectedCategories] =
    useState<string[]>(selectedCategories);
  const [localSelectedBrands, setLocalSelectedBrands] =
    useState<string[]>(selectedBrands);
  const [localOnSale, setLocalOnSale] = useState(onSale);
  const [localInStock, setLocalInStock] = useState(inStock);

  const [brandsIsOpen, setBrandsIsOpen] = useState(false);
  const [categoryIsOpen, setCategoryIsOpen] = useState(false);

  // Синхронізація з глобальним станом
  useEffect(() => {
    setLocalMinPrice(minPrice);
    setLocalMaxPrice(maxPrice);
    setLocalSelectedCategories(selectedCategories);
    setLocalSelectedBrands(selectedBrands);
    setLocalSelectedAttributes(selectedAttributes);
    setLocalOnSale(onSale);
    setLocalInStock(inStock);
  }, [
    minPrice,
    maxPrice,
    selectedCategories,
    selectedBrands,
    selectedAttributes,
    onSale,
    inStock,
  ]);

  // Синхронізація атрибутів з URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const attributesFromURL: Record<string, string[]> = {};
    params.forEach((value, key) => {
      if (key.startsWith("attr_")) {
        const id = key.replace("attr_", "");
        attributesFromURL[id] = value.split(",");
      }
    });
    setLocalSelectedAttributes(attributesFromURL);
  }, [searchParams]);

  // Функції для управління атрибутами
  const toggleAttributeOption = (slug: string, option: string) => {
    setLocalSelectedAttributes((prev) => {
      const current = prev[slug] || [];
      return {
        ...prev,
        [slug]: current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option],
      };
    });
  };

  const toggleAttributeOpen = (slug: string) => {
    setOpenAttributes((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  // Функції для управління категоріями та брендами
  const toggleCategory = (id: string) => {
    setLocalSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((cat) => cat !== id) : [...prev, id]
    );
  };

  const toggleBrand = (id: string) => {
    setLocalSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  return {
    // Локальний стан
    localMinPrice,
    localMaxPrice,
    localSelectedCategories,
    localSelectedBrands,
    localSelectedAttributes,
    localOnSale,
    localInStock,
    brandsIsOpen,
    categoryIsOpen,
    openAttributes,

    // Сеттери
    setLocalMinPrice,
    setLocalMaxPrice,
    setLocalSelectedCategories,
    setLocalSelectedBrands,
    setLocalSelectedAttributes,
    setLocalOnSale,
    setLocalInStock,
    setBrandsIsOpen,
    setCategoryIsOpen,

    // Функції
    toggleAttributeOption,
    toggleAttributeOpen,
    toggleCategory,
    toggleBrand,

    // Дані
    attributes,
    allCategories,
    allBrands,
  };
};
