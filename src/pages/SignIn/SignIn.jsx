import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signin } from "../../redux/features/application";
import styles from "./SignIn.module.css";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.application.token);
  const error = useSelector((state) => state.application.error);
  const singingIn = useSelector((state) => state.application.singingIn);

  const validMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

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

  const submit = () => {
    dispatch(signin(mail[0], password[0]));
    setPassword("")
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
          <p>Email</p>
            <input
              className={`${(!mail && mailActive) || (mail && !validMail.test(mail)) ? styles.validError : ""} ${(mail && validMail.test(mail) ? styles.validRight : "")}`}
              type="text"
              value={mail}
              onChange={(e) => handleMail(e)}
            />
          <p>Пароль</p>
            <input
              className={`${!password && passActive ? styles.validError : ""} ${password ? styles.validRight : ""}`}
              type="password"
              value={password}
              onChange={(e) => handlePassword(e)}
            />
            <span className={styles.loginWait}>{singingIn ? 'Инициализация...' : ""}</span>
            <span className={styles.loginErr}>{error ? 'Ошибка: Неверный логин или пароль' : ""}</span>
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
