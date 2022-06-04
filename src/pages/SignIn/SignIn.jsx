import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signin } from "../../redux/features/application";
import styles from "./SignIn.module.css";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.application.token);

  const validMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  // const validPass = /(?=.*[0-9])(?=.*[!@#$%^&*)(])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*)(]{8,}/

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [mailActive, setMailActive] = useState(false)
  const [passActive, setPassActive] = useState(false)

  const handleMail = (e) => {
    setMail(e.target.value);
    setMailActive(true)
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPassActive(true)
  };
  const handleMailActive = (e) => {
    setMailActive(false)
  }
  const handlePassActive = (e) => {
    setPassActive(false)
  }

  const submit = () => {
      dispatch(signin(mail[0], password[0]));
  }

    useEffect(() => {
      if (token) {
        navigate("/");
      }
    }, [token, navigate]);

    return (
      <div className={styles.genSin}>
        <div className={styles.signinContainer}>
          <div className={styles.signinBox}>
            <h2>Войти</h2>
            <p>Электронная почта</p>
            <input
              type="text"
              value={mail}
              onChange={(e) => handleMail(e)}
              onBlur={handleMailActive}
              />
              <span className={styles.validErr}>
                {!mail && mailActive ? "Введите email" : ""}
                {mail && !validMail.test(mail) ? "Не корректный email" : ""}
              </span>
            <p>Пароль</p>
            <input
              type="password"
              value={password}
              onChange={(e) => handlePassword(e)}
              onBlur={handlePassActive}
            />
            <span className={styles.validErr}>
            {!password && passActive ? "Введите пароль" : ""}
            {/* {password && !validPass.test(password) ? "Не корректный пароль" : ""} */}
            </span>
            <button className={styles.signInBtn} onClick={() => submit()} disabled={!validMail.test(mail) || !password}>
              Войти
            </button>
          </div>
          <div className={styles.link}>
            <span>Нет аккаунта?</span>
            <Link to={"/signup"}>
              <p>Зарегистрироваться</p>{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  };

  export default SignIn;
