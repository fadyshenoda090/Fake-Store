import { configureStore } from "@reduxjs/toolkit";
import cartCounterReducer from './slices/counter'
import spinnerReducer from './slices/loader'
import subMenuReducer  from './slices/subMenuToggle'

const store = configureStore({
    reducer: {
        cartCounter: cartCounterReducer,
        loadingSpinner:spinnerReducer,
        subMenuToggler:subMenuReducer,
    }
})

export default store;