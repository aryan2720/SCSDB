export { removeMovie } from "../reducers/movieSlice"
import axios from "../../Utils/axios";
import { loadMovie } from "../reducers/movieSlice";


//We need to make actions to as to render it it in movie details
export const asyncLoadMovie = (id)=> async (dispatch, getState)=>{
    try {
        const details = await axios.get(`/movie/${id}`);
        const externalid = await axios.get(`/movie/${id}/external_ids`);
        const recommendations = await axios.get(`/movie/${id}/recommendations`);
        const similar = await axios.get(`/movie/${id}/similar`);
        const videos = await axios.get(`/movie/${id}/videos`);
        const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
        let theUltimateData = {
            details: details.data,
            externalids: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find(m=>m.type === 'Trailer'),
            watchproviders: watchproviders.data.results.IN,
        }
        // console.log(theUltimateData)
        //is data ko hmne bhaar se call krna hoga - Kahan pe - movie component mein call krenge useeffect se
        //isko hme action mein bhejna pdega toh dispatch krdenge loadMovie vale action mein
        dispatch(loadMovie(theUltimateData))
    } catch (error) {
        console.error(error);
    }

}