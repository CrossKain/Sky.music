"use client";
import styles from "@components/PlayListItem/PlayListItem.module.css";
import classNames from "classnames";
import { TTrack } from "../../types";
import { useAppSelector } from "../../store/store";
import { useSetDisLikeMutation, useSetLikeMutation } from "../../store/API/likeApi";

type Props = {
  name: string;
  time: number;
  author: string;
  album: string;
  setTrack: () => void;
  isCurrentTrack: boolean;
  liked: boolean;
  id: number;
};
export default function PlayListItem({
  name,
  time,
  author,
  album,
  setTrack,
  isCurrentTrack,
  liked,
  id,
}: Props) {
  const [like] = useSetLikeMutation();
  const [disLike] = useSetDisLikeMutation();
  const { isPlaying } = useAppSelector((state) => state.tracks);

  const handleLike = () => {
    if (liked) {
      disLike({ id });
    } else {
      like({ id });
    }
  };
  return (
    <div onClick={setTrack} className={styles.playlistItem}>
      <div className={classNames(styles.playlistTrack, styles.track)}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            {isCurrentTrack ? (
              <div
                className={classNames(styles.trackImagePlaying, {
                  [styles.trackAnimation]: isPlaying,
                })}
              ></div>
            ) : (
              <svg className={styles.trackTitleSvg}>
                <use href="image/icon/sprite.svg#icon-note"></use>
              </svg>
            )}
          </div>
          <div onClick={setTrack} className={styles.trackTitleText}>
            {name}
            <span className={styles.trackTitleSpan}></span>
          </div>
        </div>
        <div onClick={setTrack} className={styles.trackAuthor}>
          {author}
        </div>
        <div onClick={setTrack} className={styles.trackAlbum}>
          {album}
        </div>
        <div className={styles.trackTime}>
          <button type="button" onClick={handleLike}>
            <svg className={styles.trackTimeSvg}>
              <use href="image/icon/sprite.svg#icon-like"></use>
            </svg>
          </button>

          <span className={styles.trackTimeText}>{time}</span>
        </div>
      </div>
    </div>
  );
}
