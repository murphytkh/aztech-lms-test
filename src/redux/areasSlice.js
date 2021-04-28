import {createSlice} from "@reduxjs/toolkit";

export const areasSlice = createSlice({
    name: "areas",
    initialState: {
        value: []
    },
    reducers: {
        setAreas: (state, action) => {
            state.value = action.payload;
        }
    },
});

export const {} = areasSlice.actions;

export default areasSlice.reducer;