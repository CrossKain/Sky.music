"use client";
import styles from "@components/BarVolumeBlock/BarVolumeBlock.module.css";
import classNames from "classnames";
import { useState } from "react";

export default function BarVolumeBlock({ handleVolume }) {
  const [volume, setVolume] = useState("");

  const onChange = (e) => {
    let newVolume = e.target.value;
    setVolume(newVolume);
    handleVolume(+newVolume)
  };
  return (
    <div className={classNames(styles.barVolumeBlock, styles.volume)}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg className={styles.volumeSvg}>
            <use href="/image/icon/sprite.svg#icon-volume"></use>
          </svg>
        </div>
        <div className={classNames(styles.volumeProgress, styles._btn)}>
          <input
            value={volume}
            onChange={onChange}
            step={1}
            min={0}
            max={100}
            className={classNames(styles.volumeProgressLine, styles._btn)}
            type="range"
            name="range"
          />
        </div>
      </div>
    </div>
  );
}
