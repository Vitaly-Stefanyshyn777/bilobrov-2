import { ProductInfo } from "../../types/productTypes";
import { ProductRatingBlock } from "./ProductRatingBlock";
import { ProductBrand } from "./ProductBrand";
import { ProductName } from "./ProductName";
import { ProductShortDescription } from "./ProductShortDescription";
import { ProductPriceBlock } from "./ProductPriceBlock";
import { ProductAvailabilityBlock } from "./ProductAvailabilityBlock";
import { ProductAuthBlock } from "./ProductAuthBlock";
import s from "./ProductContent.module.css";

interface ProductItemProps {
  info: ProductInfo;
  openRegister: () => void;
}

export const ProductContent: React.FC<ProductItemProps> = ({
  info,
  openRegister,
}) => {
  const brandName = info.brands[0]?.name || "";

  if (!info.attributes) return <p>Loading...</p>;

  return (
    <div className={s.content}>
      <ProductRatingBlock
        rating={parseFloat(info.average_rating) || 0}
        count={Number(info.rating_count) || 0}
      />
      <ProductBrand brand={brandName} />
      <ProductName name={info.name} />
      <ProductShortDescription desc={info.short_description} />
      <ProductPriceBlock info={info} />
      <ProductAvailabilityBlock stock={info.stock_quantity} sku={info.sku} />
      <ProductAuthBlock onAuth={openRegister} />
    </div>
  );
};
