import Bar from "@components/Bar/Bar";
import CentrBlock from "@components/CentrBlock/CentrBlock";
import { TTrack } from "../../types";

type Props = {
  tracks: TTrack[] | undefined;
  title: string | undefined;
};

const TrackLayout = ({ tracks, title }: Props) => {
  return (
    <>
      <CentrBlock tracks={tracks} title={title} />
    </>
  );
};

export default TrackLayout;
