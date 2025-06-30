import s from "./Header.module.css";
import { MenuIcon2 } from "../Icon/Icon";

export const HeaderMenuButton = ({ isMobile }: { isMobile: boolean }) => (
  <button className={s.menuBtn}>
    <MenuIcon2 />
    {!isMobile && <p>Меню</p>}
  </button>
);
