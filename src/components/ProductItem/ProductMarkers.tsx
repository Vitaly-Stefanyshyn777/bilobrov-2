import React from "react";
import s from "./ProductMarkers.module.css";
import { ProductInfo } from "../../types/productTypes";

interface ProductMarkersProps {
  info: ProductInfo;
}

const isNewProduct = (dateCreated: string) => {
  if (!dateCreated) return false;
  const createdDate = new Date(dateCreated);
  const today = new Date();
  const daysDiff = Math.floor(
    (today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysDiff <= 14;
};

export const ProductMarkers: React.FC<ProductMarkersProps> = ({ info }) => (
  <div className={s.markersBlock}>
    {info.featured && (
      <div className={s.bestMarker}>
        <span>bilobrov&apos;S</span>
        <span>BEST</span>
      </div>
    )}
    <div className={s.topMarker}>TOP</div>
    {isNewProduct(info.date_created) && <div className={s.newMarker}>NEW</div>}
    {info.sale_price &&
      info.sale_price !== "0" &&
      info.regular_price &&
      info.regular_price !== "0" && (
        <div className={s.saleMarker}>
          -
          {Math.round(
            (1 - Number(info.sale_price) / Number(info.regular_price)) * 100
          )}
          %
        </div>
      )}
  </div>
);
