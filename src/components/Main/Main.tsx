"use client";
import Bar from "@components/Bar/Bar";
import CentrBlock from "@components/CentrBlock/CentrBlock";
import MainSlideBar from "@components/MainSlideBar/MainSlideBar";
import Nav from "@components/Nav/Nav";
import styles from "@components/Main/Main.module.css";
import { useState } from "react";
import { TTrack } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/store";

export default function Main() {
  const { track } = useAppSelector((state) => state.tracks);
  
  return (
    <>
      <main className={styles.main}>
        <Nav />
        {/* <CentrBlock  /> */}
        <MainSlideBar />
      </main>
      {track && <Bar />}
      <footer className="footer"></footer>
    </>
  );
}
