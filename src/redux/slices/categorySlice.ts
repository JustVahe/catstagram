import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import ICategory from "../../types/categoryTypes";

interface CategoryState {
    value : null | ICategory[]
}

const initialState : CategoryState = {
    value : null
}

export const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers : {
        setCategories : (state, action : PayloadAction<ICategory[]>) => {
            state.value = action.payload;
        }
    }
})

export const {setCategories} = categorySlice.actions;

export const selectCategories = (state : RootState) => state.categories.value;

export default categorySlice.reducer;