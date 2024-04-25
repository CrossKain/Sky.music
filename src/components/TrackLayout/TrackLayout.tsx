
import CentrBlock from "@components/CentrBlock/CentrBlock";
import { TTrack } from "../../types";

type Props = {
  tracks: TTrack[] | undefined;
  title: string | undefined;
  isFavorite: boolean;
};

const TrackLayout = ({ tracks, title, isFavorite }: Props) => {
  return (
    <>
      <CentrBlock tracks={tracks} title={title} isFavorite={isFavorite}/>
    </>
  );
};

export default TrackLayout;
