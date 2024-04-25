"use client";

import { useGetFavoriteTracksQuery } from "../../../store/API/likeApi";
import CentrBlock from "@components/CentrBlock/CentrBlock";

const Favorite = () => {
  const { data = [], isLoading } = useGetFavoriteTracksQuery();
  return (
    <CentrBlock
      isLoading={isLoading}
      isFavorite={true}
      tracks={data}
      title="Любимые Треки"
    />
  );
};

export default Favorite;
