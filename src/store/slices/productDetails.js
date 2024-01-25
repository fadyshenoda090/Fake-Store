import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance, { cancel } from "../../axiosConnfig/axiosConfig";


export const productDetailsAction = createAsyncThunk('products/getProductDetails', async (id) => {
    const res = await axiosInstance.get(`/products/${id}`);
    return res.data;
});


const detailsSlice = createSlice({
    name: "details",
    initialState: { product: {},loading:true },
    extraReducers: (builder) => {
        builder.addCase(productDetailsAction.fulfilled, (state, action) => {
            state.product = action.payload;
            state.loading = false;
        });
    }
});


export default detailsSlice.reducer;