import s from "./Footer.module.css";
import { useTranslation } from "react-i18next";
import { TelegramIcon } from "../Icon/Icon";

export const FooterSupportBlock = () => {
  const { t } = useTranslation();
  return (
    <div className={s.supportBlock}>
      <div className={s.linkBlock}>
        <span>+38 (067) 481 16 50</span>
        <br />
        <span>support@bilobrov.cosmetics</span>
      </div>
      <div className={s.scheduleBlock}>
        <span>{t("footer.support.workTimeLabel")}</span>
        <p>{t("footer.support.workTime")}</p>
      </div>
      <div className={s.tgLink}>
        <div className={s.icon}>
          <TelegramIcon />
        </div>
        <span>ТELEGRAM</span>
      </div>
    </div>
  );
};
