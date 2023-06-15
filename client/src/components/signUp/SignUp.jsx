import { useState } from "react";
import style from "./style.module.css";
import logo from "../../asset/img/logo.png";
import logoImg from "../../asset/img/loginImg.jpg";
import { useForm } from "react-hook-form";
import axios from "axios";

const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let headers = {
      "Content-Type": "application/json; charset=UTF-9",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(
        "http://localhost:3001/registration",
        {
          username: data.username,
          password: data.password,
          repeatPassword: data.repeatPassword,
          email: data.email,
        },
        headers
      )
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
        }
      })
      .catch((err) => setError(err.response.data));
  };
  return (
    <div className={style.signUpContainer}>
      <section className={style.form}>
        <img src={logo} alt="logo" />
        <article className={style.loginForm}>
          <h3>Welcome Back</h3>
          <p className={style.welcome}>Please enter required info to sign up</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`${style.input} ${style.username}`}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                {...register("username", {
                  onChange: () => setError(""),
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

            <div className={`${style.input} ${style.username}`}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                {...register("email", {
                  onChange: () => setError(""),
                  required: {
                    value: true,
                    message: "fill fields",
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "wrong email format",
                  },
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div className={`${style.input} ${style.password}`}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                {...register("password", {
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
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div className={`${style.input} ${style.password}`}>
              <label htmlFor="repeatPassword">Repeat Password</label>
              <input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                {...register("repeatPassword", {
                  required: {
                    value: true,
                    message: "Fill field",
                  },
                  minLength: {
                    value: 3,
                    message: "minimum length 3",
                  },
                  validate: (val) => {
                    if (watch("password") !== val) {
                      return "Your passwords do not match";
                    }
                  },
                })}
              />
              {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
            </div>
            {error && <p className={`${style.err}`}>{error}</p>}
            {success && (
              <p className={`${style.succ}`}>Confirmation email was sent</p>
            )}
            <button className={`${style.loginBtn}`} type="submit">
              SIGN UP
            </button>
          </form>
          <p className={`${style.signUp}`}>
            Already have a account? <a href="/">Log In</a>
          </p>
        </article>
      </section>
      <section className={style.img}>
        <img src={logoImg} alt="covid img" />
      </section>
    </div>
  );
};

export default SignUp;
