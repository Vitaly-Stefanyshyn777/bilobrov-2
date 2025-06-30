"use client";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

interface HeaderContentProps {
  isMobile: boolean;
  openRegister: React.Dispatch<React.SetStateAction<boolean>>;
  openWishList: () => void;
}

export const useHeaderContent = ({
  isMobile,
  openRegister,
  openWishList,
}: HeaderContentProps) => {
  const pathname = usePathname();
  const { i18n } = useTranslation();

  const showFreeDeliveryBanner = useMemo(() => {
    return !isMobile;
  }, [isMobile]);

  const showSearchButton = useMemo(() => {
    return !isMobile;
  }, [isMobile]);

  const showProfileButton = useMemo(() => {
    return isMobile;
  }, [isMobile]);

  const showLanguageSelect = useMemo(() => {
    return !isMobile && !pathname.startsWith("/order-succes");
  }, [isMobile, pathname]);

  const showOrderTopPanel = useMemo(() => {
    return pathname.startsWith("/order-succes");
  }, [pathname]);

  const showUserSettings = useMemo(() => {
    return !pathname.startsWith("/order-succes");
  }, [pathname]);

  const showBottomNav = useMemo(() => {
    return !isMobile;
  }, [isMobile]);

  const phoneNumber = "+38 (067) 481 16 50";

  return {
    showFreeDeliveryBanner,
    showSearchButton,
    showProfileButton,
    showLanguageSelect,
    showOrderTopPanel,
    showUserSettings,
    showBottomNav,
    phoneNumber,
    i18n,
    openRegister,
    openWishList,
  };
};
