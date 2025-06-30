import s from "./ProductItem.module.css";
import { ProductInfo } from "../../types/productTypes";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useProductStore } from "@/store/products/useProductStore";
import type { ProductStore } from "@/store/products/useProductStore";
import { ProductMarkers } from "./ProductMarkers";
import { ProductImage } from "./ProductImage";
import { ProductBrand } from "./ProductBrand";
import { ProductName } from "./ProductName";
import { ProductShortDescription } from "./ProductShortDescription";
import { ProductRating } from "./ProductRating";
import { ProductPrice } from "./ProductPrice";

interface ProductItemProps {
  info: ProductInfo;
  certificate?: boolean;
  mini?: boolean;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  info,
  certificate,
  mini,
}) => {
  const reviews = useProductStore((state: ProductStore) => state.reviews);
  const currentReviews = reviews.filter(
    (item: { product_id: number }) => item.product_id == info.id
  );
  const { width } = useWindowSize();
  const isMobile = width < 1024;
  const brandName = info.brands[0]?.name || "";
  const localAverage =
    currentReviews.length > 0
      ? currentReviews.reduce(
          (sum: number, r: { rating: number }) => sum + r.rating,
          0
        ) / currentReviews.length
      : 0;

  return (
    <>
      <li
        key={info.id}
        className={`${s.productItem} ${mini && s.miniProductItem} ${
          (info.stock_quantity ?? 0) < 1 && s.notAvailable
        } `}
      >
        {/* <Link className={s.link} href={`/product/${info.slug}/${info.id}`} /> */}
        <div className={s.block}>
          <ProductImage info={info} />
          <ProductMarkers info={info} />
          <ProductBrand brandName={brandName} certificate={certificate} />
          <ProductName name={info.name} />
          <ProductShortDescription shortDescription={info.short_description} />
          <ProductRating
            rating={localAverage}
            reviewsCount={currentReviews.length}
            isMobile={isMobile}
          />
        </div>
        <div>
          <ProductPrice
            price={info.price}
            salePrice={info.sale_price}
            regularPrice={info.regular_price}
          />
        </div>
      </li>
    </>
  );
};
