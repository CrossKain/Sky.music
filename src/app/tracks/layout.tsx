'use client'
import Bar from "@components/Bar/Bar";
import MainSlideBar from "@components/MainSlideBar/MainSlideBar";
import Nav from "@components/Nav/Nav";
import styles from "./layout.module.css";
import { useAppSelector } from "../../store/store";
export default function TracksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { track } = useAppSelector((state) => state.tracks);

  return (
    <>
      <main className={styles.main}>
        <Nav />
        {children}
        {track && <Bar />}
        <MainSlideBar />
      </main>
      <footer className="footer"></footer>
    </>
  );
}
