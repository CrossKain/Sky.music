'use client'
import TrackLayout from "@components/TrackLayout/TrackLayout";
import { useGetCategoryTracksQuery } from "../../../../store/API/trackApi";

const Category = ({ params }) => {
  const { data } = useGetCategoryTracksQuery({ id: params.id });
  return <TrackLayout tracks={data?.tracks} title={data?.name} />;
};
export default Category;
