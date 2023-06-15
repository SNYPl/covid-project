import { useState, useContext, useEffect } from "react";
import style from "./style.module.css";
import { dataContext } from "../../store/dataContext";
import { MagnifyingGlass } from "react-loader-spinner";
import { useTranslation } from "react-i18next";

const Country = () => {
  const { statistic, setStatistic, defStats } = useContext(dataContext);
  const [search, setSearch] = useState("");
  const [activeArrow, setActiveArrow] = useState(true);
  const { t } = useTranslation();

  const dataStatistic = statistic.filter(
    (el) => el.country !== "Total:" && el.country !== ""
  );

  let filteredStatic = dataStatistic.filter((el) => {
    if (search.length > 0) {
      return el.country.toLowerCase().match(search);
    }

    return el;
  });

  const searchHandler = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const sortWithCountryUp = () => {
    setActiveArrow("countryUp");
    const sortedCountry = filteredStatic.sort(function (a, b) {
      let textA = a.country.toLowerCase();
      let textB = b.country.toLowerCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    setStatistic(sortedCountry);
  };

  const sortWithCountryDown = () => {
    setActiveArrow("countryDown");
    const sortedCountry = filteredStatic.sort(function (a, b) {
      let textA = a.country.toLowerCase();
      let textB = b.country.toLowerCase();
      return textA < textB ? 1 : textA > textB ? -1 : 0;
    });
    setStatistic(sortedCountry);
  };

  const sortByNewCasesUp = () => {
    setActiveArrow("newCaseUp");
    const sortedNewCases = filteredStatic.sort((el, el1) => {
      return el1.newCases - el.newCases;
    });

    setStatistic(sortedNewCases);
  };

  const sortByNewCasesDown = () => {
    setActiveArrow("newCaseDown");
    const sortedNewCases = filteredStatic.sort((el, el1) => {
      return el.newCases - el1.newCases;
    });

    setStatistic(sortedNewCases);
  };

  const sortByDeathUp = () => {
    setActiveArrow("deathUp");
    const sortedDeath = filteredStatic.sort((el, el1) => {
      return el1.newDeaths - el.newDeaths;
    });

    setStatistic(sortedDeath);
  };

  const sortByDeathDown = () => {
    setActiveArrow("deathDown");
    const sortedDeath = filteredStatic.sort((el, el1) => {
      return el.newDeaths - el1.newDeaths;
    });

    setStatistic(sortedDeath);
  };

  const sortByRecoverhUp = () => {
    setActiveArrow("recoveredUp");
    const sortedRecovery = filteredStatic.sort((el, el1) => {
      return el1.newRecovered - el.newRecovered;
    });

    setStatistic(sortedRecovery);
  };

  const sortByRecoverDown = () => {
    setActiveArrow("recoveredDown");
    const sortedRecovery = filteredStatic.sort((el, el1) => {
      return el.newRecovered - el1.newRecovered;
    });

    setStatistic(sortedRecovery);
  };

  const clearSorting = () => {
    setActiveArrow("");
    setStatistic(defStats);
  };

  return (
    <div className={style.countryStatistic}>
      <div className={style.searchContainer}>
        <input
          type="text"
          placeholder={t("dashboard.search")}
          onChange={searchHandler}
        />
        <button onClick={clearSorting}> {t("dashboard.clear")}</button>
      </div>

      <section className={style.countryTable}>
        <table>
          <tr style={{ height: "56px" }}>
            <th>
              {t("dashboard.location")}{" "}
              <div>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={activeArrow === "countryUp" ? style.active : ""}
                  onClick={sortWithCountryUp}
                >
                  <path d="M5 0.5L10 5.5L0 5.5L5 0.5Z" />
                </svg>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="auto"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={sortWithCountryDown}
                  className={` ${style.downArrow} ${
                    activeArrow === "countryDown" ? style.active : ""
                  }`}
                >
                  <path d="M5 0.5L10 5.5L0 5.5L5 0.5Z" />
                </svg>
              </div>
            </th>
            <th>
              {t("dashboard.cases")}{" "}
              <div>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="auto"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={sortByNewCasesUp}
                  className={activeArrow === "newCaseUp" ? style.active : ""}
                >
                  <path d="M5 0.5L10 5.5L0 5.5L5 0.5Z" />
                </svg>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="auto"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={sortByNewCasesDown}
                  className={` ${style.downArrow} ${
                    activeArrow === "newCaseDown" ? style.active : ""
                  }`}
                >
                  <path d="M5 0.5L10 5.5L0 5.5L5 0.5Z" />
                </svg>
              </div>
            </th>
            <th>
              {t("dashboard.death")}{" "}
              <div>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="auto"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={sortByDeathUp}
                  className={activeArrow === "deathUp" ? style.active : ""}
                >
                  <path d="M5 0.5L10 5.5L0 5.5L5 0.5Z" />
                </svg>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="auto"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={sortByDeathDown}
                  className={` ${style.downArrow} ${
                    activeArrow === "deathDown" ? style.active : ""
                  }`}
                >
                  <path d="M5 0.5L10 5.5L0 5.5L5 0.5Z" />
                </svg>
              </div>
            </th>
            <th>
              {t("dashboard.recovered")}{" "}
              <div>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={activeArrow === "recoveredUp" ? style.active : ""}
                  onClick={sortByRecoverhUp}
                >
                  <path d="M5 0.5L10 5.5L0 5.5L5 0.5Z" />
                </svg>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="auto"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={sortByRecoverDown}
                  className={` ${style.downArrow} ${
                    activeArrow === "recoveredDown" ? style.active : ""
                  }`}
                >
                  <path d="M5 0.5L10 5.5L0 5.5L5 0.5Z" />
                </svg>
              </div>
            </th>
          </tr>

          {statistic.length ? (
            filteredStatic.map((el, index) => (
              <tr style={{ height: "46px" }} key={index}>
                <td>{el.country}</td>
                <td>{el.newCases}</td>
                <td>{el.newDeaths}</td>
                <td>{el.newRecovered}</td>
              </tr>
            ))
          ) : (
            <div className={style.spinnerCont}>
              <MagnifyingGlass
                visible={true}
                height="150"
                width="150"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
              />
            </div>
          )}
        </table>
      </section>
    </div>
  );
};

export default Country;
