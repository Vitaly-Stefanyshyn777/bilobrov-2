import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import s from "./LanguageSelect.module.css";
import { ArrowDownSmallIcon } from "../Icon/Icon";

import { i18n as I18nType } from "i18next";

interface LanguageSelectProps {
  i18n: I18nType;
  changeLanguage: (lang: string) => void;
}

export const LanguageSelect: React.FC<LanguageSelectProps> = ({
  i18n,
  changeLanguage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside); // Було "mousedown"
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const languages = [
    { code: "en", label: "Eng" },
    { code: "ua", label: "Укр" },
  ];

  return (
    <div
      className={s.langSelectWrapper}
      ref={containerRef}
      onClick={(e) => e.stopPropagation()} // ⬅️ важливо!
    >
      <div
        className={s.langSelected}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p>{languages.find((l) => l.code === i18n.language)?.label || "Укр"}</p>
        <ArrowDownSmallIcon className={isOpen ? s.rotate : ""} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={s.langOptions}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {languages.map((lang) => (
              <li
                key={lang.code}
                className={i18n.language === lang.code ? s.activeOption : ""}
                onClick={(e) => {
                  e.stopPropagation(); // ✅ додаємо це
                  changeLanguage(lang.code);
                  setIsOpen(false);
                }}
              >
                {lang.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
