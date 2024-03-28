"use client";
import Image from "next/image";

import styles from "../signup/page.module.css";
import classNames from "classnames";
import { useRegistrationMutation } from "../../store/API/authApi";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [registration] = useRegistrationMutation();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    username: "",
  });

  const router = useRouter();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const onClick = () => {
    const { email, password, repeatPassword, username } = userData;
    if (password !== repeatPassword) {
      alert("пароли не совпадают, долбоеп");
      return;
    }
    registration({ email, password, username })
      .unwrap()
      .then((response) => {
        router.push("/signin");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerSignup}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin}>
            <a href="../">
              <div className={styles.modalLogo}>
                <Image
                  width={140}
                  height={21}
                  src="/image/logo_modal.png"
                  alt="Логотип"
                />
              </div>
            </a>
            <input
              onChange={onChange}
              value={userData.username}
              className={classNames(styles.modalInput, styles.passwordDouble)}
              type="name"
              name="username"
              placeholder="Введите имя"
            />
            <input
              onChange={onChange}
              value={userData.email}
              className={classNames(styles.modalInput, styles.login)}
              type="text"
              name="email"
              placeholder="Почта"
            />
            <input
              onChange={onChange}
              value={userData.password}
              className={classNames(styles.modalInput, styles.passwordFirst)}
              type="password"
              name="password"
              placeholder="Пароль"
            />
            <input
              onChange={onChange}
              value={userData.repeatPassword}
              className={classNames(styles.modalInput, styles.passwordDouble)}
              type="password"
              name="repeatPassword"
              placeholder="Повторите пароль"
            />

            <button type="button" onClick={onClick} className={styles.modalBtnSignupEnt}>
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
