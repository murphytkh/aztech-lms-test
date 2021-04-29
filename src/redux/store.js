import {configureStore} from "@reduxjs/toolkit";
import {locationDataReducer, locationsReducer, areasReducer, blocksReducer,
        selectedLocationReducer, selectedAreaReducer, selectedBlockReducer} 
        from "./locationDataSlice";

export default configureStore({
    reducer: {
        locationData: locationDataReducer,
        locations: locationsReducer,
        areas: areasReducer,
        blocks: blocksReducer,
        selectedLocation: selectedLocationReducer,
        selectedArea: selectedAreaReducer,
        selectedBlock: selectedBlockReducer
    },
})