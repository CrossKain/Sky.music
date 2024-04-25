"use client";
import TrackLayout from "@components/TrackLayout/TrackLayout";
import { useGetCategoryTracksQuery } from "../../../../store/API/trackApi";
import CentrBlock from "@components/CentrBlock/CentrBlock";

type Props = {
  params: { id: string };
};
const Category = ({ params }: Props) => {
  const { data, isLoading } = useGetCategoryTracksQuery({ id: params.id });
  return (
    <CentrBlock
      isLoading={isLoading}
      tracks={data?.tracks || []}
      title={data?.name || ""}
    />
  );
};
export default Category;
