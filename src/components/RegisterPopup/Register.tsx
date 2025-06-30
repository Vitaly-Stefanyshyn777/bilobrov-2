import React from "react";
import s from "./Register.module.css";
import { UserIcon } from "../Icon/Icon";

const RegisterModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className={s.modalOverlay}>
      <div className={s.modal}>
        <button onClick={onClose} className={s.closeBtn}>
          <UserIcon />
        </button>
        <div className={s.placeholderText}>
          Реєстрація/логін недоступні у цій версії
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
