"use client";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import s from "./Header.module.css";

interface HeaderClassManagerProps {
  isMobile: boolean;
  isScrolled: boolean;
}

export const useHeaderClassManager = ({ isMobile, isScrolled }: HeaderClassManagerProps) => {
  const pathname = usePathname();

  const headerClass = useMemo(() => {
    return [
      s.header,
      pathname.startsWith("/product/") ||
      pathname.startsWith("/order-success") ||
      pathname.startsWith("/catalog/") ||
      isMobile ||
      [
        "/about",
        "/support",
        "/podarunkovi-sertyfikaty-20",
        "/catalog",
        "/brendy",
      ].includes(pathname)
        ? s.hovered
        : "",
      isScrolled ? s.hovered : "",
      pathname === "/order" ? s.dn : "",
      "header",
    ]
      .filter(Boolean)
      .join(" ");
  }, [pathname, isMobile, isScrolled]);

  const headerTopLineClass = useMemo(() => {
    return `${s.headerTopLine} ${pathname.startsWith("/order-succes") && s.border}`;
  }, [pathname]);

  const leftButtonsClass = useMemo(() => {
    return `flex gap-[4.8vw] lg:gap-[1.6vw] ${
      pathname.startsWith("/order-succes") && "opacity-0"
    }`;
  }, [pathname]);

  return {
    headerClass,
    headerTopLineClass,
    leftButtonsClass,
  };
};
