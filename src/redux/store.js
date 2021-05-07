import {configureStore} from "@reduxjs/toolkit";
// location data
import {locationDataReducer, locationsReducer, areasReducer, blocksReducer,
        levelsReducer, lightsReducer, selectedLocationReducer, selectedAreaReducer, 
        selectedBlockReducer, selectedLevelReducer, selectedLightsReducer} 
        from "./locationDataSlice";
// ui popup states
import {editProfileReducer, relocationReducer} from "./dashboardUISlice";
// misc info
import {versionReducer, darkModeReducer, gatewayDataReducer} from "./miscInfoSlice";
// notifications

// individual block data
import {blockDataReducer, statusDataReducer} from "./blockDataSlice";
// threejs scene data
import {addReducer, disableHotkeysReducer, allLightsReducer} from "./threeDataSlice";

export default configureStore({
    reducer: {
        // location data (blocks are dependent on selected area)
        locationData: locationDataReducer,
        locations: locationsReducer,
        areas: areasReducer,
        blocks: blocksReducer,
        levels: levelsReducer,
        lights: lightsReducer,

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
        version: versionReducer,
        darkMode: darkModeReducer,
        gatewayData: gatewayDataReducer,

        // notifications
        // not done yet

        // individual block data
        blockData: blockDataReducer,
        statusData: statusDataReducer,

        // threejs data

        // light data
        allLights: allLightsReducer,
        // ui states
        add: addReducer,
        disableHotkeys: disableHotkeysReducer,
    },
})