import create from "./create";

// ui states
export const addSlice = create("add", "setAdd");
export const {setAdd} = addSlice.actions;
export const addReducer = addSlice.reducer;

// current selected objects
export const selectedSlice = create("selected", "setSelected", []);
export const {setSelected} = selectedSlice.actions;
export const selectedReducer = selectedSlice.reducer;

export const allLightsSlice = create("allLights", "setAllLights", []);
export const {setAllLights} = allLightsSlice.actions;
export const allLightsReducer = allLightsSlice.reducer;