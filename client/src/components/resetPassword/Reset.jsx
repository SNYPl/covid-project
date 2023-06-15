import { useState } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import logo from "../../asset/img/logo.png";
import axios from "axios";

const Reset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = (data) => {
    let headers = {
      "Content-Type": "application/json; charset=UTF-9",
      "Access-Control-Allow-Origin": "*",
    };

    axios
      .post(
        "http://localhost:3001/password/reset/sendMail",
        {
          email: data.email,
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={`${style.input} ${style.password}`}>
                <label htmlFor="">Email</label>
                <input
                  type="text"
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
              <button>RESET PASSWORD</button>
            </form>{" "}
          </>
        ) : (
          <div>
            <p>We have sent you a email</p>
          </div>
        )}
        {error && <p className={style.errorsP}>{error}</p>}
      </section>
    </div>
  );
};

export default Reset;
