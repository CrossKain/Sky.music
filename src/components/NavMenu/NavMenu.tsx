import classNames from "classnames";
import styles from "@components/NavMenu/NavMenu.module.css";
import Link from "next/link";
import { FC, useContext } from "react";
import { useAppSelector } from "../../store/store";
import { AuthContext } from "../../context/AuthProvider";
type TNavMenu = {
  isOpen: boolean;
};
const NavMenu: FC<TNavMenu> = ({ isOpen }) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const { logout } = useContext(AuthContext);
  const handleAuthClick = () => {
    if (isAuth === true) {
      logout()
    }
  };
  return (
    <>
      {isOpen && (
        <div className={classNames(styles.navMenu, styles.menu)}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Link href="/" className={styles.menuLink}>
                Главное
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/favorite"> Мой плейлист</Link>
            </li>
            <li className={styles.menuItem}>
              <button className={styles.buttonLink} onClick={handleAuthClick}>
                <Link href="/signin">{isAuth ? "Выйти" : "Войти"}</Link>
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavMenu;
