import React from "react";
import s from "./Pagination.module.css";
import { ArrowLeftIcon, ArrowRightIcon } from "../Icon/Icon";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("..");
      pages.push(totalPages);
    }

    return pages.map((page, idx) =>
      typeof page === "number" ? (
        <button
          key={idx}
          className={`${s.pageBtn} ${page === currentPage ? s.active : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ) : (
        <span key={idx} className={s.dots}>
          {page}
        </span>
      )
    );
  };

  return (
    <div className={s.pagination}>
      <button
        className={s.arrow}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ArrowLeftIcon />
      </button>
      <div className={s.numbers}>{renderPages()}</div>
      <button
        className={s.arrow}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
};
