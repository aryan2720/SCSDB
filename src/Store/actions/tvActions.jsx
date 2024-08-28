export { removeTv } from "../reducers/tvSlice"
import axios from "../../Utils/axios";
import { loadTv } from "../reducers/tvSlice";


//We need to make actions to as to render it it in tv details
export const asyncLoadTv = (id)=> async (dispatch, getState)=>{
    try {
        const details = await axios.get(`/tv/${id}`);
        const externalid = await axios.get(`/tv/${id}/external_ids`);
        const recommendations = await axios.get(`/tv/${id}/recommendations`);
        const similar = await axios.get(`/tv/${id}/similar`);
        const videos = await axios.get(`/tv/${id}/videos`);
        const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
        let theUltimateData = {
            details: details.data,
            externalids: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find(m=>m.type === 'Trailer'),
            watchproviders: watchproviders.data.results.IN,
        }
        // console.log(theUltimateData)
        //is data ko hmne bhaar se call krna hoga - Kahan pe - tv component mein call krenge useeffect se
        //isko hme action mein bhejna pdega toh dispatch krdenge loadTv vale action mein
        dispatch(loadTv(theUltimateData))
    } catch (error) {
        console.error(error);
    }

}