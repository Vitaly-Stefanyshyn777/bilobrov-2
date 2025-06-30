import s from "./Footer.module.css";
import { useTranslation, Trans } from "react-i18next";

export const FooterBottomBlock = ({ isMobile }: { isMobile: boolean }) => {
  const { t } = useTranslation();
  if (isMobile) return null;
  return (
    <div className={s.footerBottomBlock}>
      <p>{t("footer.rights")}</p>
      <p>
        <Trans i18nKey="footer.developedBy" components={{ 1: <a href="" /> }} />
      </p>
    </div>
  );
};
