"use client";

import classNames from "classnames";
import styles from "./Bar.module.css";
import BarVolumeBlock from "@components/BarVolumeBlock/BarVolumeBlock";
import { TTrack } from "../../types";
import ProgressBar from "@components/ProgressBar/ProgressBar";
import { useEffect, useRef, useState } from "react";

type Props = {
  track: TTrack | null;
};
export default function Bar({ track }: Props) {
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const [isPlay, setIsPlay] = useState(true);
  const [isLoop, setIsLoop] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return `${minutes}:${secondsLeft.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    audioRef.current?.play();
  }, []);
  useEffect(() => {
    audioRef.current?.addEventListener("pause", () => setIsPlay(false));
    audioRef.current?.addEventListener("play", () => setIsPlay(true));
    audioRef.current?.addEventListener("timeupdate", updateTime);
    return () => {
      audioRef.current?.removeEventListener("timeupdate", updateTime);
    };
  }, []);
  const updateTime = () => {
    setCurrentTime(audioRef.current!.currentTime);
  };
  const handlePlay = () => {
    audioRef.current?.play();
    setIsPlay(true);
  };
  const handlePause = () => {
    audioRef.current?.pause();
    setIsPlay(false);
  };

  const handleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !isLoop;
      setIsLoop(!isLoop);
    }
  };
  const handleVolume = (value) => {
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };
  const rewindTrack = (value) => {
    setCurrentTime(value);
    audioRef.current.currentTime = value;
  };

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <audio autoPlay src={track?.track_file} ref={audioRef}></audio>
        <div className={styles.barTime}>
          {formatTime(currentTime)} / {formatTime(audioRef.current?.duration)}
        </div>
        <ProgressBar
          onChange={rewindTrack}
          value={currentTime}
          max={audioRef.current?.duration}
        />

        <div className={styles.barPlayerBlock}>
          <div className={classNames(styles.barPlayer, styles.player)}>
            <div className={styles.playerControls}>
              <div
                className={styles.playerBtnPrev}
                onClick={() => alert("Еще не реализовано")}
              >
                <svg className={styles.playerBtnPrevSvg}>
                  <use href="image/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div className={classNames(styles.playerBtnPlay, styles._btn)}>
                <svg className={styles.playerBtnPlaySvg}>
                  {isPlay ? (
                    <use
                      onClick={handlePause}
                      href="/image/icon/sprite.svg#icon-pause"
                    ></use>
                  ) : (
                    <use
                      onClick={handlePlay}
                      href="/image/icon/sprite.svg#icon-play"
                    ></use>
                  )}
                </svg>
              </div>
              <div
                className={styles.playerBtnNext}
                onClick={() => alert("Еще не реализовано")}
              >
                <svg className={styles.playerBtnNextSvg}>
                  <use href="/image/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                onClick={handleLoop}
                className={classNames(styles.playerBtnRepeat, styles._btnIcon)}
              >
                <svg className={styles.playerBtnRepeatSvg}>
                  {isLoop ? (
                    <use href="/image/icon/sprite.svg#icon_repeatOn"></use>
                  ) : (
                    <use href="/image/icon/sprite.svg#icon-repeat"></use>
                  )}
                </svg>
              </div>
              <div
                className={classNames(styles.playerBtnShuffle, styles._btnIcon)}
              >
                <svg
                  className={styles.playerBtnShuffleSvg}
                  onClick={() => alert("Еще не реализовано")}
                >
                  <use href="/image/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div
              className={classNames(styles.playerTrackPlay, styles.trackPlay)}
            >
              <div className={styles.trackPlayContain}>
                <div className={styles.trackPlayImage}>
                  <svg className={styles.trackPlaySvg}>
                    <use href="/image/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlayAuthor}>
                  <a className={styles.trackPlayAuthorLink} href="http://">
                    {track?.author}
                  </a>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <a className={styles.trackPlayAlbumLink} href="http://">
                    {track?.name}
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.trackPlayLikeDis}>
              <div
                className={classNames(styles.trackPlayLike, styles._btnIcon)}
              >
                <svg className={styles.trackPlayLikeSvg}>
                  <use href="/image/icon/sprite.svg#icon-like"></use>
                </svg>
              </div>
              <div
                className={classNames(styles.trackPlayDislike, styles._btnIcon)}
              >
                <svg className={styles.trackPlayDislikeSvg}>
                  <use href="/image/icon/sprite.svg#icon-dislike"></use>
                </svg>
              </div>
            </div>
          </div>
          <BarVolumeBlock handleVolume={handleVolume} />
        </div>
      </div>
    </div>
  );
}
