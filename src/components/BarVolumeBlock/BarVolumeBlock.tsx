"use client";
import styles from "@components/BarVolumeBlock/BarVolumeBlock.module.css";
import classNames from "classnames";
import React, { ChangeEvent, useState } from "react";
type Props = {
  handleVolume: (volume: number) => void;
};

const BarVolumeBlock = React.memo(({ handleVolume }: Props) => {
  const [volume, setVolume] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newVolume = e.target.value;
    setVolume(newVolume);
    handleVolume(+newVolume);
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
});

BarVolumeBlock.displayName = "BarVolumeBlock";
export default BarVolumeBlock;
