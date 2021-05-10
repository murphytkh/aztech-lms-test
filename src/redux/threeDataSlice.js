import create from "./create";

// create prototype:
// create(state name, set function name, initial value)

// light data
export const allLightsSlice = create("allLights", "setAllLights", []);
export const {setAllLights} = allLightsSlice.actions;
export const allLightsReducer = allLightsSlice.reducer;

// ui states
export const addSlice = create("add", "setAdd", false);
export const {setAdd} = addSlice.actions;
export const addReducer = addSlice.reducer;

export const disableHotkeysSlice = create("disableHotkeys", "setDisableHotkeys", false);
export const {setDisableHotkeys} = disableHotkeysSlice.actions;
export const disableHotkeysReducer = disableHotkeysSlice.reducer;

export const editTriggerSlice = create("editTrigger", "setEditTrigger", false);
export const {setEditTrigger} = editTriggerSlice.actions;
export const editTriggerReducer = editTriggerSlice.reducer;

export const enableCameraSlice = create("enableCamera", "setEnableCamera", false);
export const {setEnableCamera} = enableCameraSlice.actions;
export const enableCameraReducer = enableCameraSlice.reducer;

export const showNamesSlice = create("showNames", "setShowNames", true);
export const {setShowNames} = showNamesSlice.actions;
export const showNamesReducer = showNamesSlice.reducer;

export const showGroupsSlice = create("showGroups", "setShowGroups", false);
export const {setShowGroups} = showGroupsSlice.actions;
export const showGroupsReducer = showGroupsSlice.reducer;

export const showTriggersSlice = create("showTriggers", "setShowTriggers", true);
export const {setShowTriggers} = showTriggersSlice.actions;
export const showTriggersReducer = showTriggersSlice.reducer;

export const mouseMovedSlice = create("mouseMoved", "setMouseMoved", false);
export const {setMouseMoved} = mouseMovedSlice.actions;
export const mouseMovedReducer = mouseMovedSlice.reducer;

export const displayMsgSlice = create("displayMsg", "setDisplayMsg", false);
export const {setDisplayMsg} = displayMsgSlice.actions;
export const displayMsgReducer = displayMsgSlice.reducer;

export const displayTimeIDSlice = create("displayTimeID", "setDisplayTimeID");
export const {setDisplayTimeID} = displayTimeIDSlice.actions;
export const displayTimeIDReducer = displayTimeIDSlice.reducer;

export const displayColourSlice = create("displayColour", "setDisplayColour", "#000000");
export const {setDisplayColour} = displayColourSlice.actions;
export const displayColourReducer = displayColourSlice.reducer;