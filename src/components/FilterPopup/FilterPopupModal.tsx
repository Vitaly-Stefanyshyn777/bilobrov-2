"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import s from "./FilterPopup.module.css";

interface FilterPopupModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const useFilterPopupModal = ({ onClose }: { onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return { modalRef };
};

export const FilterPopupModal: React.FC<FilterPopupModalProps> = ({
  onClose,
  children,
}) => {
  const { modalRef } = useFilterPopupModal({ onClose });

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={s.modalOverlay}
    >
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={s.modal}
        ref={modalRef}
      >
        {children}
      </motion.div>
    </motion.div>,
    document.body
  );
};
