import { useState } from "react";
import style from "./style.module.css";
import logo from "../../asset/img/logo.png";
import logoImg from "../../asset/img/loginImg.jpg";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Verify = () => {
  let location = useLocation();

  const tokenUrl = location.pathname.split("=")[1];

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-9",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      Authorization: `Bearer ${tokenUrl}`,
    },
  };

  useEffect(() => {
    axios
      .put("http://localhost:3001/verified/:token", { token: tokenUrl }, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });

  return (
    <div className={style.signUpContainer}>
      <section className={style.form}>
        <img src={logo} alt="logo" />
        <article className={style.loginForm}>
          <h3>Welcome Back</h3>

          <h1>You Account is successfully verified</h1>

          <a href="/">Log In</a>
        </article>
      </section>
      <section className={style.img}>
        <img src={logoImg} alt="covid img" />
      </section>
    </div>
  );
};

export default Verify;
