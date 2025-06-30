import React from "react";
import s from "./ProductShortDescription.module.css";

interface ProductShortDescriptionProps {
  shortDescription: string | React.ReactNode;
}

export const ProductShortDescription: React.FC<
  ProductShortDescriptionProps
> = ({ shortDescription }) => {
  if (typeof shortDescription === "string") {
    return (
      <p
        className={s.shortDesc}
        dangerouslySetInnerHTML={{ __html: shortDescription }}
      />
    );
  }
  return <>{shortDescription}</>;
};
