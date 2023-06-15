import "./App.css";
import Landing from "./components/landing/Landing";
import Login from "./components/login/Login";
import Registration from "./components/signUp/SignUp";
import Reset from "./components/resetPassword/Reset";
import PasswordChange from "./components/resetPassword/reset/ResetPassword";
import Verify from "./components/signUp/verify";
import { loginContext } from "./components/store/loginContext";
import { dataContext } from "./components/store/dataContext";
import VerifyPage from "./components/signUp/SendVerify";
import Cookies from "universal-cookie";
import axios from "axios";

import { Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";

function App() {
  const { login, setLogin } = useContext(loginContext);
  const { setStatistic, setDefStats } = useContext(dataContext);
  const cookies = new Cookies();
  useEffect(() => {
    if (cookies.get("loginHandler")) {
      setLogin("verified");
    }
  }, [cookies.get("loginHandler")]);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3001/dashboard", {
          headers: {
            accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json; charset=UTF-9",
            "Access-Control-Allow-Methods": "POST,GET,OPTIONS,DELETE,PUT",
          },
        })
        .then((res) => {
          setStatistic(res.data.regionData);
          setDefStats(res.data.regionData);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            login === "unVerified" ? (
              <VerifyPage />
            ) : login === "verified" ? (
              <Landing />
            ) : (
              <Login />
            )
          }
        />
        {/* <Route
          path="/login"
          element={
            login === "unVerified" ? (
              <VerifyPage />
            ) : login === "verified" ? (
              <Landing />
            ) : (
              <Login />
            )
          }
        /> */}
        <Route
          path="/dashboard"
          element={
            login === "unVerified" ? (
              <VerifyPage />
            ) : login === "verified" ? (
              <Landing />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/registration" element={<Registration />} />
        <Route path="/verified/:token" element={<Verify />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/password/reset/:email" element={<PasswordChange />} />
      </Routes>
    </div>
  );
}

export default App;
