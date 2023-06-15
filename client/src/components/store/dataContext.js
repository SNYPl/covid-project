import React, { createContext, useState } from "react";

export const dataContext = createContext();

export const DataProvider = (props) => {
  const [statistic, setStatistic] = useState([]);
  const [defStats, setDefStats] = useState([]);

  return (
    <dataContext.Provider
      value={{
        statistic,
        setStatistic,
        setDefStats,
        defStats,
      }}
    >
      {props.children}
    </dataContext.Provider>
  );
};
