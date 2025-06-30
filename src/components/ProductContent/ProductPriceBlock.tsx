import s from "./ProductContent.module.css";

interface ProductPriceBlockProps {
  info: {
    sale_price: string;
    price: string;
    regular_price: string;
  };
}

export const ProductPriceBlock: React.FC<ProductPriceBlockProps> = ({
  info,
}) => (
  <div className="flex lg:mb-[1vw] mb-[4.2vw]">
    {info.sale_price && info.sale_price !== "0" ? (
      <>
        <span className={`${s.salePrice} ${s.red}`}>{info.sale_price}</span>
        <span className={`${s.currency} ${s.red}`}>₴</span>
        <span className={s.regularPrice}>{info.regular_price}</span>
        <span className={s.regularPrice}>₴</span>
      </>
    ) : (
      <>
        <span className={s.salePrice}>{info.price}</span>
        <span className={s.currency}>₴</span>
      </>
    )}
  </div>
);
