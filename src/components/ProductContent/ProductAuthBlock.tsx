import s from "./ProductContent.module.css";
import { AuthIcon } from "../Icon/Icon";

export const ProductAuthBlock: React.FC<{ onAuth: () => void }> = ({
  onAuth,
}) => (
  <div onClick={onAuth} className={s.auth}>
    <AuthIcon />
    <span>Авторизуйся</span>
    <p>і отримуй бонуси</p>
  </div>
);
