import { useState } from "react";
import Navigation from "../navigation/Navigation";
import style from "./style.module.css";
import World from "./worldWide/World";
import Country from "./byCountry/Country";
import { useTranslation } from "react-i18next";

const Landing = () => {
  const [active, setActive] = useState("Worldwide");
  const { t } = useTranslation();

  return (
    <div className={style.landing}>
      <Navigation />
      <section className={style.statistic}>
        <h2>{t("dashboard.statistic")}</h2>
        <div className={style.menu}>
          <h3
            onClick={() => setActive("Worldwide")}
            className={active === "Worldwide" && `${style[active]}`}
          >
            {t("dashboard.worldWide")}
          </h3>
          <h3
            onClick={() => setActive("Country")}
            className={active === "Country" && `${style[active]}`}
          >
            {t("dashboard.byCountry")}
          </h3>
        </div>
      </section>

      <section>
        {active === "Worldwide" && <World />}
        {active === "Country" && <Country />}
      </section>
    </div>
  );
};

export default Landing;
