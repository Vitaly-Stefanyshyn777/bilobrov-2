import React from "react";
import s from "./ProductRating.module.css";
import { StarRating } from "../StarRating/StarRating";

interface ProductRatingProps {
  rating: number;
  reviewsCount: number;
  isMobile: boolean;
}

export const ProductRating: React.FC<ProductRatingProps> = ({
  rating,
  reviewsCount,
  isMobile,
}) => (
  <div className={s.ratingBlock}>
    <StarRating isMobile={isMobile} rating={rating} />
    <span>({reviewsCount})</span>
  </div>
);
