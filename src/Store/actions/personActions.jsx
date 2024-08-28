export { removePerson } from "../reducers/personSlice"
import axios from "../../Utils/axios";
import { loadPerson } from "../reducers/personSlice";


//We need to make actions to as to render it it in person details
export const asyncLoadPerson = (id)=> async (dispatch, getState)=>{
    try {
        const details = await axios.get(`/person/${id}`);
        const externalid = await axios.get(`/person/${id}/external_ids`);
        const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
        const tvCredits = await axios.get(`/person/${id}/tv_credits`);
        const movieCredits = await axios.get(`/person/${id}/movie_credits`);
        let theUltimateData = { 
            details: details.data,
            externalids: externalid.data,
            combinedCredits: combinedCredits.data,
            movieCredits: movieCredits.data,
            tvCredits: tvCredits.data,
        }
        // console.log(theUltimateData)
        //is data ko hmne bhaar se call krna hoga - Kahan pe - person component mein call krenge useeffect se
        //isko hme action mein bhejna pdega toh dispatch krdenge loadPerson vale action mein
        dispatch(loadPerson(theUltimateData))
    } catch (error) {
        console.error(error);
    }

}