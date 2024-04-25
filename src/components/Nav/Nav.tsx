"use client";
import Image from "next/image";
import styles from "@components/Nav/Nav.module.css";
import classNames from "classnames";
import { useState } from "react";
import  NavMenu  from "@components/NavMenu/NavMenu";

export default function Nav() {
  const [isOpen, isSetOpen] = useState<boolean>(false);
  return (
    <nav className={classNames(styles.mainNav, styles.nav)}>
      <div className={classNames(styles.navLogo, styles.logo)}>
        <Image
          alt="Логотип"
          width={113}
          height={17}
          className={styles.logoImage}
          src="/image/logo.png"
        />
      </div>
      <div
        onClick={() => isSetOpen(!isOpen)}
        className={classNames(styles.navBurger, styles.burger)}
      >
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </div>
      <NavMenu isOpen={isOpen} />
    </nav>
  );
}
