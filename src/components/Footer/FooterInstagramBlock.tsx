import Image from "next/image";
import s from "./Footer.module.css";
import { useTranslation } from "react-i18next";
import { ArrowUpRightIcon } from "../Icon/Icon";

export const FooterInstagramBlock = () => {
  const { t } = useTranslation();
  return (
    <div className={s.instaBlock}>
      <div className={s.instaLink}>
        <Image
          src="/icons/footer-logo.svg"
          alt="Logo"
          width={120}
          height={40}
        />
        <div className={s.instaTextBlock}>
          <span className={s.instaNick}>@bilobrov_cosmetics</span>
          <span className={s.instaSubscribe}>
            {t("footer.instagramBlock.subscribe")}
            <ArrowUpRightIcon className={s.instaArrow} />
          </span>
        </div>
      </div>
      <div className={s.instaTitle}>
        <span>{t("footer.instagramBlock.label")}</span>
        <p>{t("footer.instagramBlock.description")}</p>
      </div>
    </div>
  );
};
