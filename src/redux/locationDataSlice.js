import {createSlice} from "@reduxjs/toolkit";

const cap = (s) => {return s.charAt(0).toUpperCase() + s.slice(1)};

const set = (state, action) => {state.value = action.payload};

const func = (id) => {
    return createSlice({
        name: id,
        initialState: {value: null},
        reducers: {["set" + cap(id)]: set},
    });
}

export const areasSlice = func("areas");

//export const areasSlice = createSlice({
//    name: "areas",
//    initialState: {value: null},
//    reducers: {"setAreas": set},
//});

export const {setAreas} = areasSlice.actions;
export const areasReducer = areasSlice.reducer;

export const blocksSlice = createSlice({
    name: "blocks",
    initialState: {value: null},
    reducers: {setBlocks: set},
});

export const {setBlocks} = blocksSlice.actions;
export const blocksReducer = blocksSlice.reducer;