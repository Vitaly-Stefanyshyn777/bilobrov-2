import s from "./Header.module.css";
import { SearchIcon } from "../Icon/Icon";

export const HeaderSearchButton = () => (
  <button className={s.searchBtn}>
    <SearchIcon />
  </button>
);
