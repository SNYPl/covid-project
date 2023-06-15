import React, { createContext, useState } from "react";

export const loginContext = createContext();

export const LoginProvider = (props) => {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState(false);

  return (
    <loginContext.Provider
      value={{
        setLogin,
        login,
        setUsername,
        username,
      }}
    >
      {props.children}
    </loginContext.Provider>
  );
};
