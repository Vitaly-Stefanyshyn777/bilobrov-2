import s from "./ProductContent.module.css";

export const ProductName: React.FC<{ name: string }> = ({ name }) => (
  <p className={s.productName}>{name}</p>
);
