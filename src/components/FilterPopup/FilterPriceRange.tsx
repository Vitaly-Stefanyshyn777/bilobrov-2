import React from "react";
import s from "./FilterPopup.module.css";
import { RangeInput } from "./RangeInput";

interface FilterPriceRangeProps {
  min: number;
  max: number;
  value: { min: number; max: number };
  onChange: (v: { min: number; max: number }) => void;
}

export const FilterPriceRange: React.FC<FilterPriceRangeProps> = ({
  min,
  max,
  value,
  onChange,
}) => (
  <div className={s.rangeContainer}>
    <RangeInput min={min} max={max} value={value} onChange={onChange} />
  </div>
);
