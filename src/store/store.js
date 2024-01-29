import { configureStore } from "@reduxjs/toolkit";
import cartCounterReducer from './slices/counter'
import subMenuReducer from './slices/subMenuToggle'
import productsReduder from './slices/products'
import productDetailsReducer from './slices/productDetails'
import cartReducer from './slices/cart'

const store = configureStore({
    reducer: {
        cartCounter: cartCounterReducer,
        subMenuToggler: subMenuReducer,
        products: productsReduder,
        productDetails: productDetailsReducer,
        cart: cartReducer,
    }
})

export default store;