"use client";
import TrackLayout from "@components/TrackLayout/TrackLayout";
import { useGetCategoryTracksQuery } from "../../../../store/API/trackApi";

type Props = {
  params: { id: string };
};
const Category = ({ params }: Props) => {
  const { data } = useGetCategoryTracksQuery({ id: params.id });
  return <TrackLayout tracks={data?.tracks || []} title={data?.name || ""} />;
};
export default Category;
