import React, { RefObject } from "react";
import { ProductItem } from "@/components/ProductItem/ProductItem";
import { Loader } from "@/components/Loader/Loader";
import type { ProductInfo } from "@/types/productTypes";
import s from "./CatalogProductList.module.css";

interface CatalogProductListProps {
  products: ProductInfo[];
  isLoading: boolean;
  productsRef: RefObject<HTMLUListElement | null>;
}

export const CatalogProductList: React.FC<CatalogProductListProps> = ({
  products,
  isLoading,
  productsRef,
}) => (
  <>
    {isLoading ? (
      <Loader />
    ) : (
      <ul ref={productsRef} className={s.list}>
        {products
          .filter((product) => product && product.slug && product.id)
          .map((product) => (
            <ProductItem key={product.id} info={product} />
          ))}
      </ul>
    )}
  </>
);
