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
// not done
// individual block data
import {blockDataReducer, statusDataReducer, energyDataReducer} from "./blockDataSlice";
// threejs scene data
import {allLightsReducer, groupColoursReducer, addReducer, disableHotkeysReducer, 
        editTriggerReducer, enableCameraReducer, displayMsgReducer, displayTimeIDReducer, 
        displayColourReducer, showNamesReducer, showGroupsReducer, showTriggersReducer, 
        mouseMovedReducer, currLightReducer, currPointReducer, hoveredLightReducer, 
        sbTopReducer, sbLeftReducer, sbWidthReducer, sbHeightReducer} 
        from "./threeDataSlice";

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
        energyData: energyDataReducer,

        // threejs data

        // light data
        allLights: allLightsReducer,
        // scene data
        groupColours: groupColoursReducer,
        // ui states
        add: addReducer,
        disableHotkeys: disableHotkeysReducer,
        editTrigger: editTriggerReducer,
        enableCamera: enableCameraReducer,
        showNames: showNamesReducer,
        showGroups: showGroupsReducer,
        showTriggers: showTriggersReducer,
        mouseMoved: mouseMovedReducer,
        // selections
        currLight: currLightReducer,
        currPoint: currPointReducer,
        hoveredLight: hoveredLightReducer,
        sbTop: sbTopReducer,
        sbLeft: sbLeftReducer,
        sbWidth: sbWidthReducer,
        sbHeight: sbHeightReducer,
        // message display
        displayMsg: displayMsgReducer,
        displayTimeID: displayTimeIDReducer,
        displayColour: displayColourReducer,
    },
})