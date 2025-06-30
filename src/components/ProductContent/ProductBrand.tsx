import s from "./ProductContent.module.css";

export const ProductBrand: React.FC<{ brand: string }> = ({ brand }) =>
  brand ? <p className={s.productBrand}>{brand}</p> : null;
