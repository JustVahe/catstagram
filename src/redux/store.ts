import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import catReducer from "./slices/catSlice";


const store = configureStore({
    reducer : {
        categories : categoryReducer,
        cats : catReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;