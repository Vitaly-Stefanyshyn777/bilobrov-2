import { StarRatingRed } from "../StarRating/StarRating";
import { useTranslation } from "react-i18next";
import s from "./ProductContent.module.css";

interface ProductRatingBlockProps {
  rating: number;
  count: number;
}

export const ProductRatingBlock: React.FC<ProductRatingBlockProps> = ({
  rating,
  count,
}) => {
  const { t } = useTranslation();
  return (
    <div className={s.ratingBlock}>
      <StarRatingRed rating={rating} />
      <span>{t("reviewsCount", { count })}</span>
    </div>
  );
};
