import { createSlice } from "@reduxjs/toolkit";

const subMenuToggleSlice = createSlice({
    name: 'subMenuToggle',
    initialState: { isMenuHidden: true },
    reducers: {
        toggler: (state,action) => {
            state.isMenuHidden = action.payload;
        }
    }
});

export const { toggler } = subMenuToggleSlice.actions;
export default subMenuToggleSlice.reducer;
