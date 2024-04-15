import Bar from "@components/Bar/Bar";
import CentrBlock from "@components/CentrBlock/CentrBlock";
import MainSlideBar from "@components/MainSlideBar/MainSlideBar";


const TrackLayout = ({ tracks, title }) => {
  return (
    <>
      <CentrBlock tracks={tracks} title={title} />
     
    </>
  );
};

export default TrackLayout;
