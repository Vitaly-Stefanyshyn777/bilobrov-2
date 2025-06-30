// покіщо потрібно, але пізніше потрібно видалити зробити заглушку
import { useState } from "react";
import s from "./MailingFormBlock.module.css";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { API_URL_WP, consumerKey, consumerSecret } from "../../constants/api";
import { ArrowRightLongIcon } from "../Icon/Icon";

export const MailingFormBlock = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [, setSubscribed] = useState(false);

  const handleSubscribe = async () => {
    if (!email) return;

    try {
      await axios.post(
        `${API_URL_WP}save-email`,
        { email },
        {
          auth: {
            username: consumerKey,
            password: consumerSecret,
          },
        }
      );

      alert(t("thanks"));

      setSubscribed(true);
      setEmail("");
    } catch (error) {
      console.error("Помилка підписки:", error);
      alert("Не вдалося підписатися. Спробуйте пізніше.");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubscribe();
      }}
      className={s.form}
    >
      <button type="submit">
        <span>{t("mailingForm.subscribe")}</span>
        <span>{t("mailingForm.newsletter")}</span>
      </button>

      <div className={s.inputContainer}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className={s.subscribeInput}
          type="email"
          value={email}
          placeholder={t("mailingForm.placeholder")}
        />
        <ArrowRightLongIcon />
      </div>
    </form>
  );
};
