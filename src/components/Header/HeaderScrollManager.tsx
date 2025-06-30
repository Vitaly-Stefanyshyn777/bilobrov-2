"use client";
import { useEffect, useRef, useState } from "react";

export const useHeaderScrollManager = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const onScroll = () => {
      if (window.scrollY < 101) {
        headerEl.classList.remove("hide");
      } else if (window.scrollY > lastScrollY.current) {
        headerEl.classList.add("hide");
      } else {
        headerEl.classList.remove("hide");
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return {
    isScrolled,
    headerRef,
  };
};
