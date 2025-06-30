import { useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import { useProductFilterStore } from "@/store/filter/useProductFilterStore";

export function useCategoryHierarchy() {
  const { slug, parentSlug, childSlug } = useParams<{
    slug?: string;
    parentSlug?: string;
    childSlug?: string;
  }>();
  const activeSlug = childSlug || parentSlug || slug;
  const allCategories = useProductFilterStore((s) => s.allCategories);

  const childCategory = useMemo(
    () => allCategories.find((c) => c.slug === activeSlug && c.parent !== 0),
    [allCategories, activeSlug]
  );
  const parentCategory = useMemo(() => {
    if (childCategory) {
      return allCategories.find((c) => c.id === childCategory.parent);
    }
    return allCategories.find((c) => c.slug === activeSlug && c.parent === 0);
  }, [allCategories, childCategory, activeSlug]);
  const childCategories = useMemo(
    () =>
      parentCategory
        ? allCategories.filter((c) => c.parent === parentCategory.id)
        : [],
    [allCategories, parentCategory]
  );

  const onTabClick = useCallback(() => {}, []);

  return { childCategory, parentCategory, childCategories, onTabClick };
}
