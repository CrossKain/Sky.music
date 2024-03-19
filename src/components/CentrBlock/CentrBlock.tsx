import ContentPlaylist from "@components/ContentPlaylist/ContentPlaylist";
import classNames from "classnames";
import styles from "@components/CentrBlock/CentrBlock.module.css";
import FilterBlock from "@components/FilterBlock/FilterBlock";
import { TTrack } from "../../types";
import { useEffect, useState } from "react";
type Props = {
  setTrack: (param: TTrack) => void;
};
export default function CentrBlock({ setTrack }: Props) {
  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    getData().then((data) => setTracks(data));
  }, []);

  return (
    <div className={classNames(styles.mainCenterBlock, styles.centerBlock)}>
      <div className={classNames(styles.centerBlockSearch, styles.search)}>
        <svg className={styles.searchSvg}>
          <use href="/image/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.searchText}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>
      <h2 className={styles.centerBlockH2}>Треки</h2>
      <FilterBlock tracks={tracks} />
      <div
        className={classNames(
          styles.centerBlockContent,
          styles.playlistContent
        )}
      >
        <div className={classNames(styles.contentTitle, styles.playlistTitle)}>
          <div className={classNames(styles.playlistTitleCol, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitleCol, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitleCol, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitleCol, styles.col04)}>
            <svg className={styles.playlistTitleSvg}>
              <use href="image/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <ContentPlaylist tracks={tracks} setTrack={setTrack} />
      </div>
    </div>
  );
}

async function getData() {
  const res = await fetch(
    "https://skypro-music-api.skyeng.tech/catalog/track/all/"
  );

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }

  return res.json();
}
