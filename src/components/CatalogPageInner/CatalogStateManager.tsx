"use client";
import { useEffect } from "react";

import { useProductFilterStore } from "@/store/filter/useProductFilterStore";
import { useCatalogQueryParams } from "@/hooks/useCatalogQueryParams";

export const useCatalogStateManager = () => {
  const {
    minPrice: urlMinPrice,
    maxPrice: urlMaxPrice,
    onSale: urlOnSale,
    inStock: urlInStock,
    selectedCategories: urlCategories,
    selectedBrands: urlBrands,
    selectedAttributes: urlAttributes,
    sort: urlSort,
    page: urlPage,
  } = useCatalogQueryParams();

  const {
    sort,
    selectedCategories,
    selectedBrands,
    setSort,
    setSelectedCategories,
    setSelectedBrands,
    setMinPrice,
    setMaxPrice,
    setInStock,
    setOnSale,
    setPage,
    page,
    minPrice,
    maxPrice,
    onSale,
    inStock,
    selectedAttributes,
    setSelectedAttributes,
  } = useProductFilterStore();

  // Синхронізація стану з URL параметрами
  useEffect(() => {
    if (minPrice !== urlMinPrice) setMinPrice(urlMinPrice);
    if (maxPrice !== urlMaxPrice) setMaxPrice(urlMaxPrice);
    if (onSale !== urlOnSale) setOnSale(urlOnSale);
    if (inStock !== urlInStock) setInStock(urlInStock);
    if (sort !== urlSort) setSort(urlSort);
    if (page !== urlPage) setPage(urlPage);
    if (
      selectedCategories.length !== urlCategories.length ||
      !selectedCategories.every((v, i) => v === urlCategories[i])
    ) {
      setSelectedCategories(urlCategories);
    }
    if (
      selectedBrands.length !== urlBrands.length ||
      !selectedBrands.every((v, i) => v === urlBrands[i])
    ) {
      setSelectedBrands(urlBrands);
    }
    const attrKeys = Object.keys(urlAttributes);
    const stateAttrKeys = Object.keys(selectedAttributes);
    const attributesChanged =
      attrKeys.length !== stateAttrKeys.length ||
      attrKeys.some(
        (key) =>
          !selectedAttributes[key] ||
          selectedAttributes[key].length !== urlAttributes[key].length ||
          !urlAttributes[key].every((v, i) => selectedAttributes[key][i] === v)
      );
    if (attributesChanged) {
      setSelectedAttributes(urlAttributes);
    }
  }, [
    urlMinPrice,
    urlMaxPrice,
    urlOnSale,
    urlInStock,
    urlSort,
    urlPage,
    urlCategories,
    urlBrands,
    urlAttributes,
    setMinPrice,
    setMaxPrice,
    setOnSale,
    setInStock,
    setSort,
    setPage,
    setSelectedCategories,
    setSelectedBrands,
    setSelectedAttributes,
  ]);

  return {
    sort,
    selectedCategories,
    selectedBrands,
    setSort,
    setSelectedCategories,
    setSelectedBrands,
    setMinPrice,
    setMaxPrice,
    setInStock,
    setOnSale,
    setPage,
    page,
    minPrice,
    maxPrice,
    onSale,
    inStock,
    selectedAttributes,
    setSelectedAttributes,
  };
};
