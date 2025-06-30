import { useTranslation } from "react-i18next";
import s from "./WishListPopup.module.css";
import { TrashIcon } from "../Icon/Icon";

interface WishListClearButtonProps {
  onClear: () => void;
}

export const WishListClearButton: React.FC<WishListClearButtonProps> = ({
  onClear,
}) => {
  const { t } = useTranslation();

  return (
    <button className={s.clear} onClick={onClear}>
      <TrashIcon />
      <span>{t("deleteAll")}</span>
    </button>
  );
};
