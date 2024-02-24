import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import ICat from "../../types/catTypes";

interface CatState {
    value : null | ICat[]
}

const initialState : CatState = {
    value : null
}

export const catSlice = createSlice({
    name: "cats",
    initialState,
    reducers : {
        setCats : (state, action : PayloadAction<ICat[]>) => {
            state.value = action.payload;
        },
        addCats : (state, action : PayloadAction<ICat[]>) => { 
            state.value?.push(...action.payload);
        }
    }
})

export const {setCats, addCats} = catSlice.actions;

export const selectCats = (state : RootState) => state.cats.value;

export default catSlice.reducer;