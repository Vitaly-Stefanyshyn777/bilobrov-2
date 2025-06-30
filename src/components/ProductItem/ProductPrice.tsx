import React from "react";
import s from "./ProductPrice.module.css";

interface ProductPriceProps {
  price: string;
  salePrice?: string;
  regularPrice?: string;
}

export const ProductPrice: React.FC<ProductPriceProps> = ({
  price,
  salePrice,
  regularPrice,
}) => {
  if (salePrice && salePrice !== "0") {
    return (
      <>
        <span className={`${s.salePrice} ${s.red}`}>{salePrice}</span>
        <span className={`${s.currency} ${s.red}`}>₴</span>
        <span className={s.regularPrice}>{regularPrice}</span>
      </>
    );
  }
  return (
    <>
      <span className={s.currency}>₴</span>
      <span className={s.salePrice}>{price}</span>
    </>
  );
};
