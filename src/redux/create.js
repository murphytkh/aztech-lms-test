import {createSlice} from "@reduxjs/toolkit";

const set = (state, action) => {state.value = action.payload};

export default function create(id, setid, initial = null)
{
    return createSlice({
        name: id,
        initialState: {value: initial},
        reducers: {[setid]: set},
    });
}