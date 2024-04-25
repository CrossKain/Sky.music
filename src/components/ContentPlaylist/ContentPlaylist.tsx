"use client";
import styles from "@components/ContentPlaylist/ContentPlaylist.module.css";
import PlayListItem from "@components/PlayListItem/PlayListItem";
import classNames from "classnames";
import { TTrack } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  setCurrentTrack,
  setPlayList,
} from "../../store/features/tracks/tracksSlice";

type ContentPlayListProps = {
  tracks: TTrack[] | undefined;
  liked?: boolean;
  isLoading: boolean;
};
export default function ContentPlaylist({ tracks, isLoading }: ContentPlayListProps) {
  const dispatch = useAppDispatch();
  const { track } = useAppSelector((state) => state.tracks);
  const handleClick = (item: TTrack) => {
    dispatch(setCurrentTrack(item));
    dispatch(setPlayList(tracks));
  };
  return (
    <div className={classNames(styles.contentPlaylist, styles.playlist)}>
      {isLoading ? "Идет Загрузка" : tracks?.length
        ? tracks?.map((item) => (
            <PlayListItem
              setTrack={() => handleClick(item)}
              key={item.id}
              name={item.name}
              author={item.author}
              album={item.album}
              time={item.duration_in_seconds}
              isCurrentTrack={item.id === track?.id}
              liked={item.liked}
              id={item.id}
            />
          ))
        : "У Вас нет треков"}
    </div>
  );
}
