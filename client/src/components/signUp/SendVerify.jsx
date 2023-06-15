import { useContext } from "react";
import style from "./style.module.css";
import { loginContext } from "../store/loginContext";
import logo from "../../asset/img/logo.png";
import axios from "axios";

const Send = () => {
  const { username } = useContext(loginContext);

  const sendVerifyMail = () => {
    axios.post("http://localhost:3001/verifyMail", {
      username: username,
    });
  };

  return (
    <div className={style.verifyPage}>
      <img src={logo} alt="logo" />
      <p>Send Verify Email</p>
      <button onClick={sendVerifyMail}>Send Mail</button>
    </div>
  );
};

export default Send;
