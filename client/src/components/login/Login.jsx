import { useState, useContext } from "react";
import style from "./style.module.css";
import logo from "../../asset/img/logo.png";
import logoImg from "../../asset/img/loginImg.jpg";
import { useForm } from "react-hook-form";
import { loginContext } from "../store/loginContext";
import axios from "axios";
import Cookies from "universal-cookie";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);
  const { setLogin, setUsername } = useContext(loginContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();

  const cookies = new Cookies();

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json; charset=UTF-9",
      // " Access-Control-Max-Age": 600,
    },
  };

  const checkboxHandler = (e) => {
    setRemember(e.target.checked);
  };

  const loginHandler = (data) => {
    axios
      .post(
        "http://localhost:3001/login",
        {
          username: data.username,
          password: data.password,
        },
        axiosConfig
      )
      .then(function (response) {
        const config = {
          headers: {
            ...axiosConfig.headers,
            Authorization: `Bearer ${response.data.token}`,
          },
        };

        return axios.post(
          "http://localhost:3001/login",
          {
            username: data.username,
            password: data.password,
          },
          config
        );
      })
      .then((response) => {
        // console.log(response);
        if (
          response.status === 200 &&
          response.data.message === "Logged in successfully"
        ) {
          if (response.data.verified) {
            setLogin("verified");
            setUsername(response.data.username);
          } else {
            setLogin("unVerified");
            setUsername(response.data.username);
            return;
          }

          if (remember) {
            const expiration = new Date();
            expiration.setHours(expiration.getHours() + 3);
            cookies.set("loginHandler", response.data.token, {
              path: "/",
              expires: expiration,
            });
            cookies.set("username", response.data.username, {
              path: "/",
              expires: expiration,
            });
          }
        }
      })
      .catch((err) => setError(err.response.data.incorrect));
  };

  return (
    <div className={style.login}>
      <section className={style.form}>
        <img src={logo} alt="logo" />
        <article className={style.loginForm}>
          <h3>{t("login.welcome")}</h3>
          <p className={style.welcome}>{t("login.details")}</p>
          <form onSubmit={handleSubmit(loginHandler)}>
            <div className={`${style.input} ${style.username}`}>
              <label htmlFor="">{t("login.username")}</label>
              <input
                type="text"
                name="username"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Fill field",
                  },
                  minLength: {
                    value: 3,
                    message: "minimum length 3",
                  },
                })}
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>

            <div className={`${style.input} ${style.password}`}>
              <label htmlFor="">{t("login.password")}</label>
              <input
                type="password"
                name="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Fill field",
                  },
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            {error && (
              <p style={{ color: "red", marginBottom: "10px" }}>{error.data}</p>
            )}

            {error ? (
              <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
            ) : (
              ""
            )}

            <section className={`${style.forgotPassword}`}>
              <div className={`${style.checkbox}`}>
                <input
                  type="checkbox"
                  id="rememberLogin"
                  value="rememberLogin"
                  onChange={checkboxHandler}
                />
                <label htmlFor="rememberLogin">{t("login.remember")} </label>
              </div>
              <a href="/reset">{t("login.forgot")}</a>
            </section>

            <button type="submit" className={`${style.loginBtn}`}>
              {t("login.enter")}
            </button>
          </form>
          <p className={`${style.signUp}`}>
            {t("login.account")} <a href="/registration">{t("login.signUP")}</a>
          </p>
        </article>
      </section>
      <section className={style.img}>
        <img src={logoImg} alt="covid img" />
      </section>
    </div>
  );
};

export default Login;
