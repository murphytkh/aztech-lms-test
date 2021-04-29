import {configureStore} from "@reduxjs/toolkit";
import {areasReducer, blocksReducer} from "./locationDataSlice";

export default configureStore({
    reducer: {
        areas: areasReducer,
        blocks: blocksReducer
    },
})