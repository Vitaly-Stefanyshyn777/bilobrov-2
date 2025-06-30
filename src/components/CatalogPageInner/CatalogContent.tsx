"use client";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useProductsQuery } from "@/queries/useCatalogProductsQuery";
import { useBrandsQuery } from "@/queries/useBrandsQuery";
import { CategoryShort } from "@/types/categoryShortType";
import { ProductInfo } from "@/types/productTypes";
import { useProductFilterStore } from "@/store/filter/useProductFilterStore";
import { useSearchParams } from "next/navigation";
import { API_URL } from "@/constants/api";
import { RefObject } from "react";

interface CatalogContentProps {
  slug?: string;
  parentCategory?: CategoryShort;
  childCategory?: CategoryShort;
  childCategories: CategoryShort[];
}

export const useCatalogContent = ({
  slug,
  parentCategory,
  childCategory,
  childCategories,
}: CatalogContentProps) => {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const productsRef = useRef<HTMLUListElement>(null);
  const { selectedCategories, allCategories } = useProductFilterStore();
  const searchParams = useSearchParams();

  const { data, isLoading } = useProductsQuery();
  const products: ProductInfo[] = data?.products || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / 20);
  const { data: brandData } = useBrandsQuery();

  const brands = useMemo(() => {
    return Array.isArray(brandData) ? brandData : brandData?.items || [];
  }, [brandData]);

  const isMobile = width < 1024;

  const pageTitle = useMemo(() => {
    if (slug === "sales") return t("sales");
    if (slug === "news") return "Новинки";

    const brandId = searchParams.get("brand");

    if (brandId) {
      const brand = brands.find(
        (b: { id: number; name: string }) => b.id.toString() === brandId
      );
      if (brand) return brand.name;
    }

    if (selectedCategories.length !== 1) {
      return t("all");
    }

    const selectedCategory = allCategories.find(
      (cat: CategoryShort | undefined) =>
        cat && cat.id.toString() === selectedCategories[0]
    );

    if (!selectedCategory) return t("all");

    if (selectedCategory.parent !== 0) {
      const parent = allCategories.find(
        (cat: CategoryShort | undefined) =>
          cat && cat.id === selectedCategory.parent
      );
      return parent?.name || t("all");
    }

    return selectedCategory.name;
  }, [slug, selectedCategories, allCategories, searchParams, brands, t]);

  const breadcrumbs = useMemo(() => {
    const list = [{ name: t("breadCrumbs.main"), link: "/" }];

    if (!slug) {
      list.push({ name: "Каталог", link: "/catalog" });
    } else if (slug === "sales") {
      list.push({ name: t("sales"), link: "/catalog/sales" });
    } else if (slug === "news") {
      list.push({ name: "Новинки", link: "/catalog/news" });
    } else if (parentCategory) {
      list.push({
        name: parentCategory.name,
        link: `/catalog/${parentCategory.slug}`,
      });

      if (childCategory) {
        list.push({
          name: childCategory.name,
          link: `/catalog/${parentCategory.slug}/${childCategory.slug}`,
        });
      }
    }

    return list;
  }, [slug, parentCategory, childCategory, t]);

  let metaUrl: string | undefined;

  if (!metaUrl) {
    if (slug === "news") {
      metaUrl = `${API_URL}/product-category/news`;
    } else if (slug === "sales") {
      metaUrl = `${API_URL}/product-category/sales`;
    } else if (parentCategory && childCategory) {
      metaUrl = `${API_URL}/product-category/${parentCategory.slug}/${childCategory.slug}`;
    } else if (parentCategory) {
      metaUrl = `${API_URL}/product-category/${parentCategory.slug}`;
    } else if (slug) {
      metaUrl = `${API_URL}/product-category/${slug}`;
    } else {
      metaUrl = `${API_URL}/product-category`;
    }
  }

  return {
    products,
    isLoading,
    totalCount,
    totalPages,
    productsRef: productsRef as RefObject<HTMLUListElement>,
    isMobile,
    pageTitle,
    breadcrumbs,
    metaUrl,
    childCategories,
  };
};
