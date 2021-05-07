import create from "./create";

// ui states
export const addSlice = create("add", "setAdd", false);
export const {setAdd} = addSlice.actions;
export const addReducer = addSlice.reducer;

export const disableHotkeysSlice = create("disableHotkeys", "setDisableHotkeys", false);
export const {setDisableHotkeys} = disableHotkeysSlice.actions;
export const disableHotkeysReducer = disableHotkeysSlice.reducer;

// light data
export const allLightsSlice = create("allLights", "setAllLights", []);
export const {setAllLights} = allLightsSlice.actions;
export const allLightsReducer = allLightsSlice.reducer;