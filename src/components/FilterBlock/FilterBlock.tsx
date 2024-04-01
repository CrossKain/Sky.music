"use client";
import styles from "@components/FilterBlock/FilterBlock.module.css";
import { FilterList } from "@components/FilterList/FilterList";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { TTrack } from "../../types";
import { releaseData } from "../../Lib/const";
import { useAppSelector } from "../../store/store";
const filterObj = {
  AUTHORS: "authors",
  GENRES: "genres",
  ORDER: "order",
};

type Props = {
  tracks: TTrack[];
};

export default function FilterBlock({ tracks }: Props) {
  const [authorList, setAuthorList] = useState<string[]>([]);
  const [ganresList, setGanresList] = useState<string[]>([]);
  const { filters } = useAppSelector((state) => state.tracks);
  const [filterState, setFilterState] = useState<string | null>(null);
  const handleClick = (filter: string) => {
    if (filterState === filter) {
      setFilterState(null);
    } else {
      setFilterState(filter);
    }
  };
  useEffect(() => {
    if (tracks.length) {
      const authorsArray = tracks.map((track) => track.author);
      const authors = new Set(authorsArray);
      setAuthorList(Array.from(authors));
      const ganresArray = tracks.map((track) => track.genre);
      const ganres = new Set(ganresArray);
      setGanresList(Array.from(ganres));
    }
  }, [tracks]);

  return (
    <div className={classNames(styles.centerBlockFilter, styles.filter)}>
      <div className={styles.filterTitle}>Искать по:</div>

      <div className={styles.filterButtonWrapper}>
        {filters[filterObj.AUTHORS].length ? (
          <span className={styles.filterButtonSpan}>
            {filters[filterObj.AUTHORS].length}
          </span>
        ): null} 
        <div
          onClick={() => handleClick(filterObj.AUTHORS)}
          className={classNames(
            styles.filterButton,

            { [styles.active]: filterState === filterObj.AUTHORS },

            styles.btnText
          )}
        >
          исполнителю
        </div>
        {filterState === filterObj.AUTHORS && (
          <FilterList filterName={filterObj.AUTHORS} list={authorList} />
        )}
      </div>
      <div className={styles.filterButtonWrapper}>
        <div
          onClick={() => handleClick(filterObj.ORDER)}
          className={classNames(
            styles.filterButton,
            { [styles.active]: filterState === filterObj.ORDER },
            styles.btnText
          )}
        >
          году выпуска
        </div>
        {filterState === filterObj.ORDER && (
          <FilterList filterName={filterObj.ORDER} list={releaseData} />
        )}
      </div>
      <div className={styles.filterButtonWrapper}>
        {filters[filterObj.GENRES].length ? (
          <span className={styles.filterButtonSpan}>
            {filters[filterObj.GENRES].length}
          </span>
        ): null}
        <div
          onClick={() => handleClick(filterObj.GENRES)}
          className={classNames(
            styles.filterButton,

            { [styles.active]: filterState === filterObj.GENRES },

            styles.btnText
          )}
        >
          жанру
        </div>
        {filterState === filterObj.GENRES && (
          <FilterList filterName={filterObj.GENRES} list={ganresList} />
        )}
      </div>
    </div>
  );
}
