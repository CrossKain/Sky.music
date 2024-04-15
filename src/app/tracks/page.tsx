'use client'
import TrackLayout from "@components/TrackLayout/TrackLayout";
import { useGetAllTracksQuery } from "../../store/API/trackApi";

const MainTracks = () => {
  const { data } = useGetAllTracksQuery();
  return (<TrackLayout title="Треки" tracks={data}/>);
};

export default MainTracks;
