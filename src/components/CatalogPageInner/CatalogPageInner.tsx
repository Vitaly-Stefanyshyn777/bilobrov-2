"use client";
import React, { useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import s from "./CatalogPageInner.module.css";

import { Layout } from "@/components/Layout/Layout";
import { Pagination } from "@/components/Pagination/Pagination";
import { usePageData } from "@/hooks/usePageData";

import { CatalogBreadcrumbs } from "./CatalogBreadcrumbs";
import { CatalogProductList } from "./CatalogProductList";
import { CatalogMobileCategories } from "./CatalogMobileCategories";
import { CatalogDesktopCategories } from "./CatalogDesktopCategories";
import { CatalogFilterController } from "./CatalogFilterController";
import { CatalogSeoHead } from "./CatalogSeoHead";

import { useCatalogStateManager } from "./CatalogStateManager";
import { useCatalogDataFetcher } from "./CatalogDataFetcher";
import { useCatalogNavigation } from "./CatalogNavigation";
import { useCatalogContent } from "./CatalogContent";
import { useCatalogScrollManager } from "./CatalogScrollManager";
import { FiltersWithSuspense } from "../FilterPopup/FilterPopup";

function CatalogPageInner() {
  const pathname = usePathname();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { t } = useTranslation();

  const stateManager = useCatalogStateManager();
  useCatalogDataFetcher();
  const navigation = useCatalogNavigation();
  const content = useCatalogContent({
    slug: navigation.slug,
    parentCategory: navigation.parentCategory,
    childCategory: navigation.childCategory,
    childCategories: navigation.childCategories,
  });
  useCatalogScrollManager(
    content.childCategories,
    stateManager.selectedCategories
  );

  const { page, setPage } = stateManager;

  const seoData = usePageData(content.metaUrl);

  return (
    <main className={s.page}>
      <CatalogSeoHead seoData={seoData} pathname={pathname} />

      <Layout>
        <CatalogBreadcrumbs breadcrumbs={content.breadcrumbs} />
      </Layout>

      <Layout>
        <AnimatePresence>
          {isFilterOpen && (
            <FiltersWithSuspense onClose={() => setIsFilterOpen(false)} />
          )}
        </AnimatePresence>

        <div className={s.categoryHeader}>
          <h1>{content.pageTitle}</h1>

          <span>
            {content.totalCount} {t("catalog.productsLength")}
          </span>
        </div>
      </Layout>

      {stateManager.selectedCategories.length === 1 &&
        content.childCategories.length > 0 &&
        content.isMobile && (
          <CatalogMobileCategories
            childCategories={content.childCategories}
            selectedCategories={stateManager.selectedCategories}
            onTabClick={navigation.onTabClick}
          />
        )}

      {content.childCategories.length > 0 && content.isMobile && (
        <Layout>
          <div className={s.scroller}>
            <div className={s.scrollbarContainer}>
              <div className={s.scrollbar}></div>
            </div>
          </div>
        </Layout>
      )}

      <Layout>
        {stateManager.selectedCategories.length === 1 &&
          content.childCategories.length > 0 &&
          !content.isMobile && (
            <CatalogDesktopCategories
              childCategories={content.childCategories}
              selectedCategories={stateManager.selectedCategories}
              onTabClick={navigation.onTabClick}
            />
          )}

        <CatalogFilterController
          onOpenFilters={() => setIsFilterOpen(true)}
          sort={stateManager.sort}
          t={t}
        />

        <CatalogProductList
          products={content.products}
          isLoading={content.isLoading}
          productsRef={content.productsRef}
        />

        {!content.isLoading && content.totalCount > 20 && (
          <Pagination
            currentPage={page}
            totalPages={content.totalPages}
            onPageChange={(newPage: number) => {
              setPage(newPage);
              const catalogTop = document.querySelector(`body`);
              catalogTop?.scrollIntoView({
                block: "start",
              });
            }}
          />
        )}
      </Layout>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CatalogPageInner />
    </Suspense>
  );
}
