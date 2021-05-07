import create from "./create";

// ui states
export const addSlice = create("add", "setAdd");
export const {setAdd} = addSlice.actions;
export const addReducer = addSlice.reducer;

// light data
export const allLightsSlice = create("allLights", "setAllLights", []);
export const {setAllLights} = allLightsSlice.actions;
export const allLightsReducer = allLightsSlice.reducer;