import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance, { cancel } from "../../axiosConnfig/axiosConfig";


export const productsAction = createAsyncThunk('products/getAll', async () => {
    const res = await axiosInstance.get('/products', { cancelToken: cancel.token })
    return res.data.products
})
const productsSlice = createSlice({
    name: "products",
    initialState: { products: [],loading:true },
    extraReducers: (builder) => {
        builder.addCase(productsAction.fulfilled, (state, action) => {
            state.products = action.payload
            state.loading = false;
        })
    }
})

export default productsSlice.reducer;