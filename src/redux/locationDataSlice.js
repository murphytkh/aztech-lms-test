import {createSlice} from "@reduxjs/toolkit";

const set = (state, action) => {state.value = action.payload};

export const areasSlice = createSlice({
    name: "areas",
    initialState: {value: null},
    reducers: {setAreas: set},
});

export const {setAreas} = areasSlice.actions;
export const areasReducer = areasSlice.reducer;

export const blocksSlice = createSlice({
    name: "blocks",
    initialState: {value: null},
    reducers: {setBlocks: set},
});

export const {setBlocks} = blocksSlice.actions;
export const blocksReducer = blocksSlice.reducer;