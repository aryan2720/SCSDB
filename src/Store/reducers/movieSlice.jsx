import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    //Hmari movie ki info 
    //Initial state info ki null h
  info: null
}

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    loadMovie: (state, action) =>{
        state.info = action.payload;
    },
    removeMovie: (state, action) =>{
        state.info = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const {loadMovie, removeMovie} = movieSlice.actions

export default movieSlice.reducer