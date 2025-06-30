"use client";
import { useEffect } from "react";
import s from "./CatalogPageInner.module.css";
import { CategoryShort } from "@/types/categoryShortType";

export const useCatalogScrollManager = (
  childCategories: CategoryShort[],
  selectedCategories: string[]
) => {
  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector(`.${s.scroller}`);
      const scrollbar = document.querySelector(
        `.${s.scrollbar}`
      ) as HTMLElement;

      if (container && scrollbar) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        const rawProgress =
          maxScroll > 0 ? (container.scrollLeft / maxScroll) * 100 : 0;
        const scrollProgress = Math.max(rawProgress, 15);
        scrollbar.style.width = `${scrollProgress}%`;
      }
    };

    const container = document.querySelector(`.${s.scroller}`);
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [childCategories, selectedCategories]);
};
