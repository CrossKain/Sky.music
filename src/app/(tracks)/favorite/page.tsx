"use client";

import { useContext, useEffect } from "react";
import { useGetFavoriteTracksQuery } from "../../../store/API/likeApi";
import CentrBlock from "@components/CentrBlock/CentrBlock";
import { AuthContext } from "../../../context/AuthProvider";

const Favorite = () => {
  const { data = [], isLoading, error, refetch } = useGetFavoriteTracksQuery();
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    if (error && "status" in error && error.status === 401) {
      logout();
    }
  }, [error]);
  useEffect(() => {
    refetch()
  },[])
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
