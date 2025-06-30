import React, { Suspense } from "react";

import { useFilterPopupStateManager } from "./FilterPopupStateManager";
import { useFilterPopupNavigation } from "./FilterPopupNavigation";
import { FilterPopupModal } from "./FilterPopupModal";
import { FilterPopupContent } from "./FilterPopupContent";

export const Filters: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const stateManager = useFilterPopupStateManager();
  const { applyFilters, resetFilters } = useFilterPopupNavigation({
    localMinPrice: stateManager.localMinPrice,
    localMaxPrice: stateManager.localMaxPrice,
    localOnSale: stateManager.localOnSale,
    localInStock: stateManager.localInStock,
    localSelectedCategories: stateManager.localSelectedCategories,
    localSelectedBrands: stateManager.localSelectedBrands,
    localSelectedAttributes: stateManager.localSelectedAttributes,
    onClose,
  });

  return (
    <FilterPopupModal onClose={onClose}>
      <FilterPopupContent
        onClose={onClose}
        resetFilters={resetFilters}
        applyFilters={applyFilters}
        stateManager={stateManager}
      />
    </FilterPopupModal>
  );
};

export const FiltersWithSuspense: React.FC<{ onClose: () => void }> = (
  props
) => (
  <Suspense fallback={null}>
    <Filters {...props} />
  </Suspense>
);
