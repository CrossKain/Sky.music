import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./Search.module.css";
import { useAppDispatch } from "../../store/store";
import { setSearch } from "../../store/features/tracks/tracksSlice";
const Search = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(setSearch({ searchValue }));
  }, [dispatch, searchValue]);

  return (
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
  );
};

export default Search;
