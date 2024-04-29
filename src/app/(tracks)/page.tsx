"use client";

import { useGetAllTracksQuery } from "../../store/API/trackApi";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { TTrack } from "../../types";
import { setInitialTracks } from "../../store/features/tracks/tracksSlice";
import CentrBlock from "@components/CentrBlock/CentrBlock";

const MainTracks = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, refetch } = useGetAllTracksQuery();
  const { filteredTracks, filters } = useAppSelector((state) => state.tracks);
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
    if (data) {
      console.log(data);
      dispatch(setInitialTracks(data));
    }
  }, [data, dispatch]);
  useEffect(() => {
    refetch()
  }, [])
  console.log(trackArray);
  return <CentrBlock isLoading = {isLoading} title="Треки" tracks={trackArray} />;
};

export default MainTracks;
