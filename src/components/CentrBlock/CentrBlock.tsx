"use client";
import ContentPlaylist from "@components/ContentPlaylist/ContentPlaylist";
import classNames from "classnames";
import styles from "@components/CentrBlock/CentrBlock.module.css";
import FilterBlock from "@components/FilterBlock/FilterBlock";
import { TTrack } from "../../types";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setSearch } from "../../store/features/tracks/tracksSlice";

type Props = {
  tracks: TTrack[] | undefined;
  title: string | undefined;
};
export default function CentrBlock({ tracks, title }: Props) {
  const dispatch = useAppDispatch();
  const { filteredTracks, filters } = useAppSelector((state) => state.tracks);
  const [searchValue, setSearchValue] = useState("");

  const filterTracks = () => {
    let array: TTrack[] = [...filteredTracks];

    if (filters.genres.length) {
      array = array.filter((el) =>
        filters.genres.includes(el.genre.toLowerCase())
      );
      console.log(array);
    }
    if (filters.authors.length) {
      array = array.filter((el) =>
        filters.authors.includes(el.author.toLowerCase())
      );
      console.log(array);
    }

    switch (filters.order) {
      case "Сначала новые":
        array.sort(
          (a, b): number =>
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
        );
        break;
      case "Сначала старые":
        array.sort(
          (a, b): number =>
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
        );
        break;
    }
    return array;
  };
  const trackArray = filterTracks();
  useEffect(() => {
    dispatch(setSearch({ searchValue }));
  }, [searchValue, dispatch]);
  return (
    <div className={classNames(styles.mainCenterBlock, styles.centerBlock)}>
      <div className={classNames(styles.centerBlockSearch, styles.search)}>
        <svg className={styles.searchSvg}>
          <use href="/image/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          onChange={(event) => setSearchValue(event.target.value)}
          value={searchValue}
          className={styles.searchText}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>
      <h2 className={styles.centerBlockH2}>{title}</h2>
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
              <use href="/image/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <ContentPlaylist tracks={tracks} />
      </div>
    </div>
  );
}

// async function getData() {
//   const res = await fetch(
//     "https://skypro-music-api.skyeng.tech/catalog/track/all/"
//   );

//   if (!res.ok) {
//     throw new Error("Ошибка при получении данных");
//   }

//   return res.json();
// }
