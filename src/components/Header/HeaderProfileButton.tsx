import s from "./Header.module.css";
import { UserIcon } from "../Icon/Icon";

export const HeaderProfileButton = () => (
  <button className={s.profile}>
    <UserIcon />
  </button>
);
