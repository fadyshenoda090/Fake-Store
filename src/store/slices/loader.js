import { createSlice } from "@reduxjs/toolkit";

const spinnerSlice= createSlice({
    name:'loader',
    initialState:{loader:false,},
    reducers:{
        changeLoader:(state,action)=>{
            state.loader = action.payload;
        }
    }
}
)

export const {changeLoader} = spinnerSlice.actions;
export default spinnerSlice.reducer;