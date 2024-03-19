"use client";
import styles from "@components/PlayListItem/PlayListItem.module.css";
import classNames from "classnames";
import { TTrack } from "../../types";
type Props = {
  name: string;
  time: number;
  author: string;
  album: string;
  setTrack: () => void;
};
export default function PlayListItem({
  name,
  time,
  author,
  album,
  setTrack,
}: Props) {
  return (
    <div className={styles.playlistItem}>
      <div className={classNames(styles.playlistTrack, styles.track)}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <svg className={styles.trackTitleSvg}>
              <use href="image/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div onClick={setTrack} className={styles.trackTitleText}>
            {name}
            <span className={styles.trackTitleSpan}></span>
          </div>
        </div>
        <div onClick={setTrack} className={styles.trackAuthor}>{author}</div>
        <div onClick={setTrack} className={styles.trackAlbum}>{album}</div>
        <div className={styles.trackTime}>
          <svg className={styles.trackTimeSvg}>
            <use href="image/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.trackTimeText}>{time}</span>
        </div>
      </div>
    </div>
  );
}
