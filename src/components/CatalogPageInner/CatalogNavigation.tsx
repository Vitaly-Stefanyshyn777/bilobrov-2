"use client";
import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { CategoryShort } from "@/types/categoryShortType";
import { useProductFilterStore } from "@/store/filter/useProductFilterStore";

export const useCatalogNavigation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { allCategories, setSelectedCategories, setOnSale, setSort } =
    useProductFilterStore();

  const { slug, parentSlug, childSlug } = useParams<{
    slug?: string;
    parentSlug?: string;
    childSlug?: string;
  }>();

  const activeSlug = childSlug || parentSlug || slug;

  const childCategory = useMemo(() => {
    return allCategories.find(
      (cat: CategoryShort | undefined) =>
        cat && cat.slug === activeSlug && cat.parent !== 0
    );
  }, [allCategories, activeSlug]);

  const parentCategory = useMemo(() => {
    if (childCategory) {
      return allCategories.find(
        (c: CategoryShort | undefined) => c && c.id === childCategory.parent
      );
    }
    return allCategories.find(
      (cat: CategoryShort | undefined) =>
        cat && cat.slug === activeSlug && cat.parent === 0
    );
  }, [allCategories, childCategory, activeSlug]);

  const childCategories = useMemo(() => {
    if (!parentCategory) return [];
    return allCategories.filter(
      (cat: CategoryShort | undefined) =>
        cat && cat.parent === parentCategory.id
    );
  }, [parentCategory, allCategories]);

  const onTabClick = (categoryId: number, categorySlug: string) => {
    console.log("🎯 onTabClick called with:", { categoryId, categorySlug });

    const clickedCategory = allCategories.find(
      (cat: CategoryShort) => cat.id === categoryId
    );
    let fullSlugPath = `/catalog/${categorySlug}`;

    if (clickedCategory?.parent) {
      const parentCat = allCategories.find(
        (cat: CategoryShort) => cat.id === clickedCategory.parent
      );
      if (parentCat) {
        fullSlugPath = `/catalog/${parentCat.slug}/${clickedCategory.slug}`;
      }
    }

    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("categories", categoryId.toString());

    const newUrl = `${fullSlugPath}?${currentParams.toString()}`;
    console.log("🔄 Navigating to:", newUrl);

    router.push(newUrl);
  };

  // Синхронізація категорій з URL
  useEffect(() => {
    if (allCategories.length === 0) return;

    const categoriesFromQuery = searchParams.get("categories");
    const slugs = [childSlug || parentSlug || slug].filter(Boolean);

    if (!categoriesFromQuery && slugs.length > 0) {
      const matchedCategories = slugs
        .map((s: string | undefined) =>
          allCategories.find(
            (c: CategoryShort | undefined) => c && c.slug === s
          )
        )
        .filter((c): c is CategoryShort => c !== undefined);

      if (matchedCategories.length) {
        setSelectedCategories(
          matchedCategories.map((c: CategoryShort) => c.id.toString())
        );
      }
    }
  }, [
    slug,
    parentSlug,
    childSlug,
    allCategories,
    searchParams,
    setSelectedCategories,
  ]);

  // Спеціальні сторінки
  useEffect(() => {
    if (slug === "sales") {
      setOnSale(true);
      setSelectedCategories([]);
    } else if (slug === "news") {
      setSort("date");
      setSelectedCategories([]);
    }
  }, [slug, setOnSale, setSort, setSelectedCategories]);

  return {
    slug,
    parentSlug,
    childSlug,
    activeSlug,
    childCategory,
    parentCategory,
    childCategories,
    onTabClick,
  };
};
