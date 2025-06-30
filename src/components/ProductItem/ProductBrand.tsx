import React from "react";
import s from "./ProductBrand.module.css";

interface ProductBrandProps {
  brandName?: string;
  certificate?: boolean;
}

export const ProductBrand: React.FC<ProductBrandProps> = ({
  brandName,
  certificate,
}) => {
  if (brandName) {
    return <p className={s.productBrand}>{brandName}</p>;
  }
  if (certificate) {
    return <p className={s.productBrand}>Bilobrov</p>;
  }
  return null;
};
