import React from "react";
import s from "./ProductImage.module.css";
import { ProductInfo } from "../../types/productTypes";
import Image from "next/image";
import WishlistButton from "../WishlistButton/WishlistButton";

interface ProductImageProps {
  info: ProductInfo;
}

export const ProductImage: React.FC<ProductImageProps> = ({ info }) => (
  <div className={s.productImage}>
    {info.images && info.images.length > 0 && info.images[0]?.src ? (
      <Image
        src={info.images[0].src}
        alt={info.images[0]?.alt || info.name}
        width={100}
        height={100}
      />
    ) : (
      <div
        style={{
          width: 100,
          height: 100,
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#999",
        }}
      >
        No Image
      </div>
    )}
    <WishlistButton productId={info.id} />
  </div>
);
