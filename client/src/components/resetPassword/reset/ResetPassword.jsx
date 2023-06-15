import { useState } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import logo from "../../../asset/img/logo.png";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const location = useLocation();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = (data) => {
    const email = location.pathname.split("=")[1];
    let headers = {
      "Content-Type": "application/json; charset=UTF-9",
      "Access-Control-Allow-Origin": "*",
    };

    axios
      .patch(
        "http://localhost:3001/password/reset/:email",
        {
          password: data.password,
          email,
        },
        headers
      )
      .then((res) => (res.status === 200 ? setSuccess(true) : ""))
      .catch((err) => setError(err.response.data.message));
  };

  return (
    <div className={`${style.resetContainer}`}>
      <img src={logo} alt="logo" />

      <section className={`${style.reset}`}>
        {!success ? (
          <>
            <h3>Reset Password</h3>
            <form onSubmit={handleSubmit(onSubmit)} method="PATCH">
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
                {errors.repeatPassword && (
                  <p>{errors.repeatPassword.message}</p>
                )}
              </div>
              <button>SAVE CHANGES</button>
            </form>{" "}
          </>
        ) : (
          <div className={style.successfully}>
            <p>Your password has been updeted successfully</p>
            <a href="/">SIGN IN</a>
          </div>
        )}
        {error && <p className={style.errorsP}>{error}</p>}
      </section>
    </div>
  );
};

export default ResetPassword;
