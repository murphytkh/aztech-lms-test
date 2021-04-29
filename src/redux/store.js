import {configureStore} from "@reduxjs/toolkit";
// location data
import {locationDataReducer, locationsReducer, areasReducer, blocksReducer,
        selectedLocationReducer, selectedAreaReducer, selectedBlockReducer,
        selectedLevelReducer, selectedLightsReducer} 
        from "./locationDataSlice";
// ui popup states
import {editProfileReducer, relocationReducer} from "./dashboardUISlice";
// notifications


export default configureStore({
    reducer: {
        // location data (blocks are dependent on selected area)
        locationData: locationDataReducer,
        locations: locationsReducer,
        areas: areasReducer,
        blocks: blocksReducer,

        // currently selected location parameters
        selectedLocation: selectedLocationReducer,
        selectedArea: selectedAreaReducer,
        selectedBlock: selectedBlockReducer,
        selectedLevel: selectedLevelReducer,
        selectedLights: selectedLightsReducer,

        // ui popup states
        editProfile: editProfileReducer,
        relocation: relocationReducer,

        // misc info


        // notifications

    },
})