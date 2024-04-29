"use client";
import styles from "@components/PlayListItem/PlayListItem.module.css";
import classNames from "classnames";
import { TTrack } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  useSetDisLikeMutation,
  useSetLikeMutation,
} from "../../store/API/likeApi";
import { trackApi } from "../../store/API/trackApi";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";

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
  const [like, {error: likeError}] = useSetLikeMutation();
  const [disLike, {error: disLikeError}] = useSetDisLikeMutation();
  const { isPlaying } = useAppSelector((state) => state.tracks);
  const { isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const {logout} = useContext(AuthContext)
  useEffect(() => {
    if (likeError && 'status' in likeError && likeError.status === 401 || disLikeError && 'status' in disLikeError && disLikeError.status === 401){
      logout()
    }
  }, [likeError, disLikeError])
  const handleLike = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (isAuth === false) {
      alert("Авторизируйтесь");

      return;
    }
    if (liked) {
      await disLike({ id });
    } else {
      await like({ id });
    }
    dispatch(trackApi.util.invalidateTags([{ type: "track", id }]));
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
                <use href="/image/icon/sprite.svg#icon-note"></use>
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
          <button
            className={styles.likeButton}
            type="button"
            onClick={handleLike}
          >
            <svg className={styles.trackTimeSvg}>
              {liked ? (
                <use href="/image/icon/sprite.svg#icon-like"></use>
              ) : (
                <use href="/image/icon/sprite.svg#icon-dislike"></use>
              )}
            </svg>
          </button>

          <span className={styles.trackTimeText}>{time}</span>
        </div>
      </div>
    </div>
  );
}
