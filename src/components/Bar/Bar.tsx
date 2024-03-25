"use client";

import classNames from "classnames";
import styles from "./Bar.module.css";
import BarVolumeBlock from "@components/BarVolumeBlock/BarVolumeBlock";
import { TTrack } from "../../types";
import ProgressBar from "@components/ProgressBar/ProgressBar";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useDispatch } from "react-redux";
import {
  setNextTrack,
  setPause,
  setPlay,
  setPrevTrack,
  setShuffle,
} from "../../store/features/tracks/tracksSlice";

type Props = {
  track: TTrack | null;
};
export default function Bar() {
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const dispatch = useAppDispatch();
  const [isLoop, setIsLoop] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const { track, isPlaying, isShuffle } = useAppSelector(
    (state) => state.tracks
  );
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return `${minutes}:${secondsLeft.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    audioRef.current?.play();
  }, []);
  useEffect(() => {
    audioRef.current?.addEventListener("pause", () => dispatch(setPause()));
    audioRef.current?.addEventListener("play", () => dispatch(setPlay()));
    audioRef.current?.addEventListener("ended", () => dispatch(setNextTrack()));
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
    dispatch(setPlay());
  };
  const handlePause = () => {
    audioRef.current?.pause();
    dispatch(setPause());
  };

  const handleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !isLoop;
      setIsLoop(!isLoop);
    }
  };
  const handleVolume = (value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };
  const rewindTrack = (value: number) => {
    setCurrentTime(value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <audio autoPlay src={track?.track_file} ref={audioRef}></audio>
        <div className={styles.barTime}>
          {formatTime(currentTime)} /{" "}
          {audioRef.current && formatTime(audioRef.current?.duration)}
        </div>
        <ProgressBar
          onChange={rewindTrack}
          value={currentTime}
          max={audioRef.current?.duration ?? 0}
        />

        <div className={styles.barPlayerBlock}>
          <div className={classNames(styles.barPlayer, styles.player)}>
            <div className={styles.playerControls}>
              <div
                className={styles.playerBtnPrev}
                onClick={() => dispatch(setPrevTrack())}
              >
                <svg className={styles.playerBtnPrevSvg}>
                  <use href="image/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                onClick={isPlaying ? handlePause : handlePlay}
                className={classNames(styles.playerBtnPlay, styles._btn)}
              >
                <svg className={styles.playerBtnPlaySvg}>
                  {isPlaying ? (
                    <use href="/image/icon/sprite.svg#icon-pause"></use>
                  ) : (
                    <use href="/image/icon/sprite.svg#icon-play"></use>
                  )}
                </svg>
              </div>
              <div
                className={styles.playerBtnNext}
                onClick={() => dispatch(setNextTrack())}
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
                onClick={() => dispatch(setShuffle(!isShuffle))}
                className={classNames(styles.playerBtnShuffle, styles._btnIcon)}
              >
                <svg className={styles.playerBtnShuffleSvg}>
                  {!isShuffle ? (
                    <use href="/image/icon/sprite.svg#icon-shuffle"></use>
                  ) : (
                    <use href="/image/icon/sprite.svg#icon-InShuffle"></use>
                  )}
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
