import Image from "next/image";
import styles from "@components/MainSlideBar/MainSlideBar.module.css";
import classNames from "classnames";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useRouter } from "next/navigation";
import { setAuth } from "../../store/features/auth/AuthSlice";
import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
export default function MainSlideBar() {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const { logout } = useContext(AuthContext);
  const onClick = () => {
    logout();
  };
  return (
    <div className={classNames(styles.mainSidebar, styles.sidebar)}>
      <div className={styles.sidebarPersonal}>
        <p className={styles.sidebarPersonalName}>{user?.username}</p>
        <div className={styles.sidebarIcon}>
          <button className={styles.exitButton} onClick={onClick}>
            <svg>
              <use href="/image/icon/sprite.svg#logout"></use>
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/category/1">
              <Image
                width={250}
                height={150}
                className={styles.sidebarImage}
                src="/image/playlist01.png"
                alt="day's playlist"
              />
            </Link>
          </div>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/category/2">
              <Image
                width={250}
                height={150}
                className={styles.sidebarImage}
                src="/image/playlist02.png"
                alt="day's playlist"
              />
            </Link>
          </div>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/category/3">
              <Image
                width={250}
                height={150}
                className={styles.sidebarImage}
                src="/image/playlist03.png"
                alt="day's playlist"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
