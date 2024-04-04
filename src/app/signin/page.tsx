"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "../signin/page.module.css";
import classNames from "classnames";
import { useGetTokenMutation, useLoginMutation } from "../../store/API/authApi";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [login] = useLoginMutation();
  const [getToken] = useGetTokenMutation();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const onClick = () => {
    const { email, password } = userData;
    login({ email, password })
      .unwrap()
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response)),
          getToken({ email, password })
            .unwrap()
            .then((response) => {
              localStorage.setItem("token", JSON.stringify(response));
            });
        router.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin} action="#">
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
              value={userData.email}
              onChange={onChange}
              className={classNames(styles.modalInput, styles.login)}
              type="text"
              name="email"
              placeholder="Почта"
            />
            <input
              value={userData.password}
              onChange={onChange}
              className={classNames(styles.modalInput, styles.password)}
              type="password"
              name="password"
              placeholder="Пароль"
            />
            <button
              type="button"
              onClick={onClick}
              className={styles.modalBtnEnter}
            >
              Войти
            </button>
            <Link href="/signup" className={styles.modalBtnSignup}>
              Зарегистрироваться
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
