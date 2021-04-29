import {createSlice} from "@reduxjs/toolkit";

const set = (state, action) => {state.value = action.payload};

export default function create(id, setid)
{
    return createSlice({
        name: id,
        initialState: {value: null},
        reducers: {[setid]: set},
    });
}