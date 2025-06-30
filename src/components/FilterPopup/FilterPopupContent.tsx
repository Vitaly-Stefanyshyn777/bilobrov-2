"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import s from "./FilterPopup.module.css";
import { FilterPopupHeader } from "./FilterPopupHeader";
import { FilterCategoryList } from "./FilterCategoryList";
import { FilterBrandList } from "./FilterBrandList";
import { FilterAttributeList } from "./FilterAttributeList";
import { FilterSwitchController } from "./FilterSwitchController";
import { FilterPriceRange } from "./FilterPriceRange";
import { FilterResetButton } from "./FilterResetButton";
import { FilterApplyButton } from "./FilterApplyButton";
import { PlusIcon, MinusIcon } from "../Icon/Icon";
import { useFilterPopupStateManager } from "./FilterPopupStateManager";

interface FilterPopupContentProps {
  onClose: () => void;
  resetFilters: () => void;
  applyFilters: () => void;
  stateManager: ReturnType<typeof useFilterPopupStateManager>;
}

export const useFilterPopupContent = () => {
  const { t } = useTranslation();
  const [brandSearch, setBrandSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [attributeSearch, setAttributeSearch] = useState<
    Record<string, string>
  >({});

  return {
    brandSearch,
    setBrandSearch,
    categorySearch,
    setCategorySearch,
    attributeSearch,
    setAttributeSearch,
    t,
  };
};

export const FilterPopupContent: React.FC<FilterPopupContentProps> = ({
  onClose,
  resetFilters,
  applyFilters,
  stateManager,
}) => {
  const {
    brandSearch,
    setBrandSearch,
    categorySearch,
    setCategorySearch,
    attributeSearch,
    setAttributeSearch,
    t,
  } = useFilterPopupContent();

  return (
    <>
      <FilterPopupHeader onClose={onClose} />

      <FilterSwitchController
        onSale={stateManager.localOnSale}
        inStock={stateManager.localInStock}
        setOnSale={stateManager.setLocalOnSale}
        setInStock={stateManager.setLocalInStock}
      />

      <div className={s.rangeContainer}>
        <FilterPriceRange
          min={0}
          max={10000}
          value={{
            min: stateManager.localMinPrice,
            max: stateManager.localMaxPrice,
          }}
          onChange={({ min, max }) => {
            stateManager.setLocalMinPrice(min);
            stateManager.setLocalMaxPrice(max);
          }}
        />
      </div>

      <div className={s.backDropCOntaienr}>
        <FilterResetButton onReset={resetFilters} />

        <div className={s.backDrop}>
          <label
            className={`${stateManager.brandsIsOpen ? s.active : ""}`}
            onClick={() =>
              stateManager.setBrandsIsOpen(!stateManager.brandsIsOpen)
            }
          >
            {stateManager.brandsIsOpen ? (
              <PlusIcon className={s.plus} />
            ) : (
              <MinusIcon className={s.minus} />
            )}
            {t("catalog.filterBrands")}
            <span className={s.qty}>
              {stateManager.allBrands ? stateManager.allBrands.length : 0}
            </span>
          </label>

          {stateManager.brandsIsOpen && (
            <div className={s.list}>
              <FilterBrandList
                brands={stateManager.allBrands}
                selectedBrands={stateManager.localSelectedBrands}
                brandSearch={brandSearch}
                setBrandSearch={setBrandSearch}
                toggleBrand={stateManager.toggleBrand}
              />
            </div>
          )}
        </div>

        <div className={s.backDrop}>
          <label
            className={`${stateManager.categoryIsOpen ? s.active : ""}`}
            onClick={() =>
              stateManager.setCategoryIsOpen(!stateManager.categoryIsOpen)
            }
          >
            {stateManager.categoryIsOpen ? (
              <PlusIcon className={s.plus} />
            ) : (
              <MinusIcon className={s.minus} />
            )}
            {t("catalog.filterCat")}
            <span className={s.qty}>
              {stateManager.allCategories
                ? stateManager.allCategories.length
                : 0}
            </span>
          </label>

          {stateManager.categoryIsOpen && (
            <div className={s.list}>
              <FilterCategoryList
                categories={stateManager.allCategories}
                selectedCategories={stateManager.localSelectedCategories}
                categorySearch={categorySearch}
                setCategorySearch={setCategorySearch}
                toggleCategory={stateManager.toggleCategory}
              />
            </div>
          )}
        </div>

        {stateManager.attributes.map(
          (attr: {
            id: number;
            name: string;
            slug: string;
            options: { id: number; name: string; slug: string }[];
          }) => (
            <FilterAttributeList
              key={attr.slug}
              name={attr.name}
              slug={attr.slug}
              options={attr.options}
              selectedOptions={
                stateManager.localSelectedAttributes[attr.slug] || []
              }
              search={attributeSearch[attr.slug] || ""}
              setSearch={(v) =>
                setAttributeSearch((prev) => ({ ...prev, [attr.slug]: v }))
              }
              isOpen={!!stateManager.openAttributes[attr.slug]}
              toggleOpen={() => stateManager.toggleAttributeOpen(attr.slug)}
              toggleOption={stateManager.toggleAttributeOption}
            />
          )
        )}
      </div>

      <div>
        <FilterApplyButton onApply={applyFilters} />
      </div>
    </>
  );
};
