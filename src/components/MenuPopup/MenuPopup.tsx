import React from "react";
import s from "./MenuPopup.module.css";
import { MenuIcon } from "../Icon/Icon";

const MenuPopup: React.FC<{ onClose: () => void; openPopup: () => void }> = ({
  onClose,
}) => {
  return (
    <div className={s.modalOverlay}>
      <div className={s.modal}>
        <button onClick={onClose} className={s.closeBtn}>
          <MenuIcon />
        </button>
        <div className={s.placeholderText}>Меню недоступне у цій версії</div>
      </div>
    </div>
  );
};

export default MenuPopup;
