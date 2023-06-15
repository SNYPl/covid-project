import { useState, useContext } from "react";
import Logo from "../../asset/img/landingLogo.svg";
import style from "./style.module.css";
import { loginContext } from "../store/loginContext";
import Cookies from "universal-cookie";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const { setLogin, username } = useContext(loginContext);
  const cookies = new Cookies();
  const { t, i18n } = useTranslation();

  const logoutHandler = () => {
    setLogin(false);
    cookies.remove("loginHandler");
    cookies.remove("username");
  };

  const usernameCookies = cookies.get("username");

  return (
    <div className={style.navigation}>
      <a href="/">
        <img src={Logo} alt="logo" />
      </a>

      <section className={style.menu}>
        <select
          name="Lang"
          id="language"
          className={style.lang}
          onChange={(e) => {
            i18n.changeLanguage(e.target.value);
          }}
        >
          <option value="en" selected>
            {t("navigation.en")}
          </option>
          <option value="ge">{t("navigation.ge")}</option>
        </select>

        <div className={style.name}>
          <h4>{t("navigation.hi")},</h4>
          <h4>{username || usernameCookies}</h4>
        </div>
        <div className={style.logout}>
          <button onClick={logoutHandler}>{t("navigation.logout")}</button>
        </div>
      </section>
    </div>
  );
};

export default Navigation;
