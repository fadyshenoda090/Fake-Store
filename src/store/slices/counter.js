import { createSlice } from "@reduxjs/toolkit";

const cartCounterSlice = createSlice({
    name: 'cartCounter',
    initialState: { counter: 0 },
    reducers: {
        increaseCounter: (state) => {
            return { ...state, counter: state.counter +1}
        },
        decreaseCounter: (state) => {
            if (state.counter>0){
                return {...state, counter: state.counter -1}
            }
            return state
        }
    }
});

export const {increaseCounter ,decreaseCounter} = cartCounterSlice.actions;
export default cartCounterSlice.reducer