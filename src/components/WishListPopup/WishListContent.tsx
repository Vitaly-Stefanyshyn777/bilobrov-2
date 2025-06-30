import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { ProductItem } from "../ProductItem/ProductItem";
import type { ProductInfo } from "@/types/productTypes";
import s from "./WishListPopup.module.css";
import { WishListClearButton } from "./WishListClearButton";

interface WishListContentProps {
  products: ProductInfo[];
  isMobile: boolean;
  onClear: () => void;
}

export const WishListContent: React.FC<WishListContentProps> = ({
  products,
  isMobile,
  onClear,
}) => {
  return (
    <>
      {isMobile ? (
        <div className={s.mobileList}>
          {products.map((product: ProductInfo) => (
            <ProductItem info={product} key={product.id} />
          ))}
        </div>
      ) : (
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView="auto"
          navigation={{
            prevEl: `.${s.prevButton}`,
            nextEl: `.${s.nextButton}`,
          }}
          className="productListSwiper"
        >
          {products.map((product: ProductInfo) => (
            <SwiperSlide className={s.slide} key={product.id}>
              <ProductItem info={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {!isMobile && <WishListClearButton onClear={onClear} />}
    </>
  );
};
