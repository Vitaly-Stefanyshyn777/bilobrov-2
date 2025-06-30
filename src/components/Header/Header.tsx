"use client";

import { Layout } from "../Layout/Layout";
import s from "./Header.module.css";

import { useWindowSize } from "../../hooks/useWindowSize";
import "./Header.css";
import { LanguageSelect } from "../LanguageSelect/LanguageSelect";
import Link from "next/link";
import { HeaderSearchButton } from "./HeaderSearchButton";
import { HeaderProfileButton } from "./HeaderProfileButton";
import { FreeDeliveryBanner } from "./FreeDeliveryBanner";
import {
  MenuIcon,
  PhoneIcon,
  HeaderLogoMobile,
  HeaderLogoDesktop,
} from "../Icon/Icon";

import { useHeaderScrollManager } from "./HeaderScrollManager";
import { useHeaderCategoriesManager } from "./HeaderCategoriesManager";
import { useHeaderClassManager } from "./HeaderClassManager";
import { useHeaderContent } from "./HeaderContent";
import { HeaderUserSettings } from "./HeaderUserSettings/HeaderUserSettings";

interface HeaderProps {
  openWishList: () => void;
  openRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({
  openWishList,
  openRegister,
}) => {
  const { width } = useWindowSize();
  const isMobile = width < 1024;

  const { isScrolled, headerRef } = useHeaderScrollManager();
  const { uniqueCategories } = useHeaderCategoriesManager();
  const { headerClass, headerTopLineClass, leftButtonsClass } =
    useHeaderClassManager({
      isMobile,
      isScrolled,
    });
  const {
    showFreeDeliveryBanner,
    showSearchButton,
    showProfileButton,
    showLanguageSelect,
    showOrderTopPanel,
    showUserSettings,
    showBottomNav,
    phoneNumber,
    i18n,
  } = useHeaderContent({ isMobile, openWishList, openRegister });

  return (
    <header ref={headerRef} className={headerClass}>
      {showFreeDeliveryBanner && <FreeDeliveryBanner />}
      <Layout>
        <div className={headerTopLineClass}>
          <div className={leftButtonsClass}>
            <button className={s.menuBtn}>
              <MenuIcon />
              {!isMobile && <p>Меню</p>}
            </button>

            {showSearchButton && <HeaderSearchButton />}

            {showProfileButton && <HeaderProfileButton />}
          </div>

          <Link href="/">
            <div className={s.headerLogo}>
              {isMobile ? <HeaderLogoMobile /> : <HeaderLogoDesktop />}
            </div>
          </Link>

          {showLanguageSelect && (
            <LanguageSelect i18n={i18n} changeLanguage={i18n.changeLanguage} />
          )}

          {showOrderTopPanel ? (
            <div className={s.orderTopPanel}>
              <a href={`tel:${phoneNumber}`}>
                {isMobile ? <PhoneIcon /> : phoneNumber}
              </a>
            </div>
          ) : (
            showUserSettings && (
              <HeaderUserSettings
                openWishList={openWishList}
                openRegister={openRegister}
                isMobile={isMobile}
              />
            )
          )}
        </div>

        {showBottomNav && (
          <div className={`${s.headerBottomLine} `}>
            <nav>
              <ul className={s.navMenu}>
                {uniqueCategories.map((cat) => (
                  <li className={s.menuItem} key={cat.id}>
                    <Link href={`/catalog/${cat.slug}`} className={s.menuLink}>
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        <nav className={s.categoriesNav} style={{ marginTop: "16px" }}>
          <ul
            className={s.navMenu}
            style={{
              display: "flex",
              gap: "1.5rem",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          ></ul>
        </nav>
      </Layout>
    </header>
  );
};
