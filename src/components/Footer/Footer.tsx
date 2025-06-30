// потрібно
"use client";

import { FooterInstList } from "../FooterInstList/FooterInstList";
import { FooterNavigationBlock } from "../FooterNavigationBlock/FooterNavigationBlock";
import { Layout } from "../Layout/Layout";

import s from "./Footer.module.css";
import { useWindowSize } from "../../hooks/useWindowSize";
import { usePathname } from "next/navigation";

import { MailingFormBlock } from "../MailingFormBlock/MailingFormBlock";
import { FooterInstagramBlock } from "./FooterInstagramBlock";
import { FooterSupportBlock } from "./FooterSupportBlock";
import { FooterLogo } from "./FooterLogo";
import { FooterPaymentBlock } from "./FooterPaymentBlock";
import { FooterBottomBlock } from "./FooterBottomBlock";

// import { MailingFormBlock } from "../MailingFormBlock copy/MailingFormBlock";

export const Footer = () => {
  const pathname = usePathname();
  const { width } = useWindowSize();
  const isMobile = width < 1024;

  if (pathname === "/order") {
    return null;
  }

  return (
    <footer className={s.footer}>
      <Layout>
        <FooterInstagramBlock />

        <div className="lg:pb-[3.9vw] pb-0">
          <FooterInstList />
        </div>

        <div className="pt-[8.3vw] lg:pb-[3.7vw] pb-0">
          <FooterLogo />

          <div className={s.footerInfoBlocks}>
            <FooterSupportBlock />

            {isMobile && <MailingFormBlock />}

            <FooterNavigationBlock />

            {!isMobile && <MailingFormBlock />}
          </div>
        </div>
        <FooterPaymentBlock isMobile={isMobile} />

        <FooterBottomBlock isMobile={isMobile} />
      </Layout>
    </footer>
  );
};
