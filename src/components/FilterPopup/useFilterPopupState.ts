import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useProductFilterStore } from "@/store/filter/useProductFilterStore";
import type { CategoryShort } from "@/types/categoryShortType";

export function useFilterPopupState(onClose: () => void) {
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Локальні стани
  const [brandSearch, setBrandSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [attributeSearch, setAttributeSearch] = useState<
    Record<string, string>
  >({});
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

  // Обробники
  const toggleAttributeOption = useCallback((slug: string, option: string) => {
    setLocalSelectedAttributes((prev) => {
      const current = prev[slug] || [];
      return {
        ...prev,
        [slug]: current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option],
      };
    });
  }, []);

  const toggleAttributeOpen = useCallback((slug: string) => {
    setOpenAttributes((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  }, []);

  const toggleCategory = useCallback((id: string) => {
    setLocalSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((cat) => cat !== id) : [...prev, id]
    );
  }, []);

  const toggleBrand = useCallback((id: string) => {
    setLocalSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  }, []);

  const applyFilters = useCallback(() => {
    const query = new URLSearchParams(searchParams.toString());
    query.set("min", localMinPrice.toString());
    query.set("max", localMaxPrice.toString());
    query.set("sale", localOnSale.toString());
    query.set("stock", localInStock.toString());

    if (localSelectedCategories.length) {
      query.set("categories", localSelectedCategories.join(","));
    } else {
      query.delete("categories");
    }

    if (localSelectedBrands.length) {
      query.set("brand", localSelectedBrands.join(","));
    } else {
      query.delete("brand");
    }

    Object.entries(localSelectedAttributes).forEach(([slug, optionIds]) => {
      if (optionIds.length > 0) {
        query.set(`attr_${slug}`, optionIds.join(","));
      } else {
        query.delete(`attr_${slug}`);
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
    router.push(`${navPathname}?${query.toString()}`);
    onClose();
  }, [
    searchParams,
    localMinPrice,
    localMaxPrice,
    localOnSale,
    localInStock,
    localSelectedCategories,
    localSelectedBrands,
    localSelectedAttributes,
    allCategories,
    router,
    onClose,
  ]);

  const resetFilters = useCallback(() => {
    router.push(pathname);
    onClose();
  }, [router, pathname, onClose]);

  return {
    // Стан
    brandSearch,
    setBrandSearch,
    categorySearch,
    setCategorySearch,
    attributeSearch,
    setAttributeSearch,
    localSelectedAttributes,
    setLocalSelectedAttributes,
    openAttributes,
    setOpenAttributes,
    localMinPrice,
    setLocalMinPrice,
    localMaxPrice,
    setLocalMaxPrice,
    localSelectedCategories,
    setLocalSelectedCategories,
    localSelectedBrands,
    setLocalSelectedBrands,
    localOnSale,
    setLocalOnSale,
    localInStock,
    setLocalInStock,
    brandsIsOpen,
    setBrandsIsOpen,
    categoryIsOpen,
    setCategoryIsOpen,
    // Дані
    allCategories,
    allBrands,
    attributes,
    // Обробники
    toggleAttributeOption,
    toggleAttributeOpen,
    toggleCategory,
    toggleBrand,
    applyFilters,
    resetFilters,
  };
}
