import { StarFullIcon, StarHalfIcon, StarEmptyIcon } from "../Icon/Icon";

export const StarRating = ({
  rating,
  isMobile,
}: {
  rating: number;
  isMobile: boolean;
}) => {
  const color = isMobile ? "#D63D44" : "black";

  const stars = Array.from({ length: 5 }, (_, i) => {
    const value = rating;
    if (i + 1 <= value) return <StarFullIcon color={color} key={i} />;
    if (i < value && i + 1 > value)
      return <StarHalfIcon color={color} key={i} />;
    return <StarEmptyIcon key={i} />;
  });

  return <div className="flex ">{stars}</div>;
};

export const StarRatingRed = ({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const value = rating;
    if (i + 1 <= value)
      return (
        <StarFullIcon
          color="rgba(214, 61, 68, 1)"
          className="lg:w-[1.6vw] lg:h-[1.6vw] w-[5vw] h-[5vw]"
          key={i}
        />
      );
    if (i < value && i + 1 > value)
      return (
        <StarHalfIcon
          color="rgba(214, 61, 68, 1)"
          className="lg:w-[1.3vw] lg:h-[1.6vw] w-[4vw] h-[5.1vw]"
          key={i}
        />
      );
    return (
      <StarEmptyIcon
        className="lg:w-[1.6vw] lg:h-[1.6vw] w-[5.3vw] h-[5.3vw]"
        key={i}
      />
    );
  });

  return <div className={`flex ${className}`}>{stars}</div>;
};
