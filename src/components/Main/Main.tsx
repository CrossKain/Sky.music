'use client'
import Bar from "@components/Bar/Bar";
import CentrBlock from "@components/CentrBlock/CentrBlock";
import MainSlideBar from "@components/MainSlideBar/MainSlideBar";
import Nav from "@components/Nav/Nav";
import styles from "@components/Main/Main.module.css";
import { useState } from "react";
import { TTrack } from "../../types";

export default function Main() {
  const [track, setTrack] = useState<TTrack | null>(null);
  return (
    <>
      <main className={styles.main}>
        <Nav />
        <CentrBlock setTrack={setTrack} />
        <MainSlideBar />
      </main>
      <Bar track={track} />
      <footer className="footer"></footer>
    </>
  );
}
