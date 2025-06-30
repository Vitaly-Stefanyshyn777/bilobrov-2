// hooks/useSyncFiltersWithUrl.ts
import { useEffect } from "react";
import { useCatalogQueryParams } from "@/hooks/useCatalogQueryParams";
import { useProductFilterStore } from "@/store/filter/useProductFilterStore";

export function useSyncFiltersWithUrl() {
  const {
    minPrice: urlMinPrice,
    maxPrice: urlMaxPrice,
    onSale: urlOnSale,
    inStock: urlInStock,
    sort: urlSort,
    page: urlPage,
    selectedCategories: urlCategories,
    selectedBrands: urlBrands,
    selectedAttributes: urlAttributes,
  } = useCatalogQueryParams();

  const {
    minPrice,
    maxPrice,
    onSale,
    inStock,
    sort,
    page,
    selectedCategories,
    selectedBrands,
    selectedAttributes,
    setMinPrice,
    setMaxPrice,
    setOnSale,
    setInStock,
    setSort,
    setPage,
    setSelectedCategories,
    setSelectedBrands,
    setSelectedAttributes,
  } = useProductFilterStore();

  useEffect(() => {
    if (minPrice !== urlMinPrice) setMinPrice(urlMinPrice);
    if (maxPrice !== urlMaxPrice) setMaxPrice(urlMaxPrice);
    if (onSale !== urlOnSale) setOnSale(urlOnSale);
    if (inStock !== urlInStock) setInStock(urlInStock);
    if (sort !== urlSort) setSort(urlSort);
    if (page !== urlPage) setPage(urlPage);
    if (JSON.stringify(selectedCategories) !== JSON.stringify(urlCategories))
      setSelectedCategories(urlCategories);
    if (JSON.stringify(selectedBrands) !== JSON.stringify(urlBrands))
      setSelectedBrands(urlBrands);
    if (JSON.stringify(selectedAttributes) !== JSON.stringify(urlAttributes))
      setSelectedAttributes(urlAttributes);
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
    minPrice,
    maxPrice,
    onSale,
    inStock,
    sort,
    page,
    selectedCategories,
    selectedBrands,
    selectedAttributes,
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
}
