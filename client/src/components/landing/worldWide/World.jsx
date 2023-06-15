import { useContext } from "react";
import style from "./style.module.css";
import { dataContext } from "../../store/dataContext";
import { ColorRing } from "react-loader-spinner";
import { useTranslation } from "react-i18next";

const World = () => {
  const { statistic } = useContext(dataContext);
  const { t } = useTranslation();

  let worldWide = statistic.find((el) => {
    if (el.country === "World") {
      return el;
    }
  });

  return (
    <section className={style.infoBox}>
      <article className={`${style.box} ${style.cases}`}>
        <svg
          width="92"
          height="65"
          viewBox="0 0 92 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M48.7348 36.5C16.4144 36.5 41.2762 46 1 48.5V65H91V1C81.5525 9.5 82.0497 22.5 68.6243 22.5C55.1989 22.5 60.6685 36.5 48.7348 36.5Z"
            fill="url(#paint0_linear_5133_25)"
          />
          <path
            d="M1 48.5C41.2762 46 16.4144 36.5 48.7348 36.5C60.6685 36.5 55.1989 22.5 68.6243 22.5C82.0497 22.5 81.5525 9.5 91 1"
            stroke="#2029F3"
            strokeWidth="2"
          />
          <defs>
            <linearGradient
              id="paint0_linear_5133_25"
              x1="46.2486"
              y1="-22.5"
              x2="45.9972"
              y2="65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2029F3" stopOpacity="0.24" />
              <stop offset="1" stopColor="#2029F3" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <h4> {t("dashboard.cases")}</h4>

        <h3>
          {statistic.length ? (
            worldWide?.newCases
          ) : (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          )}
        </h3>
      </article>
      <article className={`${style.box} ${style.recover}`}>
        <svg
          width="92"
          height="41"
          viewBox="0 0 92 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M44 18.5C11.6796 18.5 41.2762 22 1 24.5V41H91V0C81.5525 8.5 82.0497 10.5 68.6243 10.5C55.1989 10.5 55.9337 18.5 44 18.5Z"
            fill="url(#paint0_linear_5133_41)"
          />
          <path
            d="M1 24.5C41.2762 22 13.6796 18 46 18C57.9337 18 56.0746 11 69.5 11C82.9254 11 81.5525 9.5 91 1"
            stroke="#0FBA68"
            strokeWidth="2"
          />
          <defs>
            <linearGradient
              id="paint0_linear_5133_41"
              x1="46.2486"
              y1="-46.5"
              x2="45.9972"
              y2="41"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0FBA68" stopOpacity="0.24" />
              <stop offset="1" stopColor="#0FBA68" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <h4> {t("dashboard.recovered")}</h4>

        <h3>
          {statistic.length ? (
            worldWide?.newRecovered
          ) : (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          )}
        </h3>
      </article>
      <article className={`${style.box} ${style.death}`}>
        <svg
          width="92"
          height="52"
          viewBox="0 0 92 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M48.7348 23.5C16.4144 23.5 41.2762 33 1 35.5V52H91V1.5C81.5525 10 82.0497 9.5 68.6243 9.5C55.1989 9.5 60.6685 23.5 48.7348 23.5Z"
            fill="url(#paint0_linear_5133_33)"
          />
          <path
            d="M1 35.5C41.2762 33 16.4144 23.5 48.7348 23.5C60.6685 23.5 55.1989 9.5 68.6243 9.5C82.0497 9.5 81.5525 10 91 1.5"
            stroke="#EAD621"
            strokeWidth="2"
          />
          <defs>
            <linearGradient
              id="paint0_linear_5133_33"
              x1="46.2486"
              y1="-35.5"
              x2="45.9972"
              y2="52"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#EAD621" stopOpacity="0.24" />
              <stop offset="1" stopColor="#EAD621" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <h4> {t("dashboard.death")}</h4>

        <h3>
          {statistic.length ? (
            worldWide?.newDeaths
          ) : (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          )}
        </h3>
      </article>
    </section>
  );
};

export default World;
