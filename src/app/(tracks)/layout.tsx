"use client";
import Bar from "@components/Bar/Bar";
const MainSlideBar = dynamic(() => import('@components/MainSlideBar/MainSlideBar'), {ssr: false})
import Nav from "@components/Nav/Nav";
import styles from "./layout.module.css";
import { useAppSelector } from "../../store/store";
import { AuthProvider } from "../../context/AuthProvider";
import dynamic from "next/dynamic";
export default function TracksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { track } = useAppSelector((state) => state.tracks);

  return (
    <AuthProvider>
      <main className={styles.main}>
        <Nav />
        {children}
        {track && <Bar />}
        <MainSlideBar />
      </main>
      <footer className="footer"></footer>
    </AuthProvider>
  );
}
