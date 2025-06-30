import React from "react";
import s from "./ProductName.module.css";

interface ProductNameProps {
  name: string;
}

export const ProductName: React.FC<ProductNameProps> = ({ name }) => (
  <p className={s.productName}>{name}</p>
);
