import s from "./Footer.module.css";
import { useTranslation, Trans } from "react-i18next";

export const FooterPaymentBlock = ({ isMobile }: { isMobile: boolean }) => {
  const { t } = useTranslation();
  return (
    <div className={s.paymentBlock}>
      <div className={s.paymentLinks}>
        <span>{t("footer.privacyPolicy")}</span>
        <span>{t("footer.offer")}</span>
      </div>
      {isMobile && (
        <div className={s.footerBottomBlock}>
          <p>{t("footer.rights")}</p>
          <p>
            <Trans
              i18nKey="footer.developedBy"
              components={{ 1: <a href="" /> }}
            />
          </p>
        </div>
      )}
      <ul>
        <li>
          <svg className="lg:w-[3.8vw]">
            <use href="/icons/payment-icons.svg#icon-24"></use>
          </svg>
        </li>
        <li>
          <svg className="lg:w-[3.2vw]">
            <use href="/icons/payment-icons.svg#icon-apple"></use>
          </svg>
        </li>
        <li>
          <svg className="lg:w-[3.2vw]">
            <use href="/icons/payment-icons.svg#icon-gpay"></use>
          </svg>
        </li>
        <li>
          <svg className="lg:w-[1.8vw]">
            <use href="/icons/payment-icons.svg#icon-mastercard"></use>
          </svg>
        </li>
        <li>
          <svg className="lg:w-[3vw]">
            <use href="/icons/payment-icons.svg#icon-visa"></use>
          </svg>
        </li>
      </ul>
    </div>
  );
};
