import {configureStore} from "@reduxjs/toolkit";
import areasReducer from "./areasSlice";

export default configureStore({
    reducer: {
        areas: areasReducer,
    },
})