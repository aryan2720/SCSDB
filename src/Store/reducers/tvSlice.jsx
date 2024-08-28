import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    //Hmari tv ki info 
    //Initial state info ki null h
  info: null
}

export const tvSlice = createSlice({
  name: 'tv',
  initialState,
  reducers: {
    loadTv: (state, action) =>{
        state.info = action.payload;
    },
    removeTv: (state, action) =>{
        state.info = null;
    }   
  },
})

// Action creators are generated for each case reducer function
export const {loadTv, removeTv} = tvSlice.actions

export default tvSlice.reducer