'use client'
import TrackLayout from "@components/TrackLayout/TrackLayout"
import { useGetFavoriteTracksQuery } from "../../../store/API/likeApi";


const Favorite = () => {
    const { data = [] } = useGetFavoriteTracksQuery();
    return (
        <TrackLayout tracks={data} title="Любимые Треки"/>
    )
}

export default Favorite