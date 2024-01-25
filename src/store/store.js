import { configureStore } from "@reduxjs/toolkit";
import cartCounterReducer from './slices/counter'
import subMenuReducer from './slices/subMenuToggle'
import productsReduder from './slices/products'
import productDetailsReducer from './slices/productDetails'

const store = configureStore({
    reducer: {
        cartCounter: cartCounterReducer,
        subMenuToggler: subMenuReducer,
        products: productsReduder,
        productDetails: productDetailsReducer,
    }
})

export default store;