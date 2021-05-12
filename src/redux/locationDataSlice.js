import create from "./create";

// overall data
export const locationDataSlice = create("locationData", "setLocationData");
export const {setLocationData} = locationDataSlice.actions;
export const locationDataReducer = locationDataSlice.reducer;

// list of location data
export const locationsSlice = create("locations", "setLocations");
export const {setLocations} = locationsSlice.actions;
export const locationsReducer = locationsSlice.reducer;

export const areasSlice = create("areas", "setAreas");
export const {setAreas} = areasSlice.actions;
export const areasReducer = areasSlice.reducer;

export const blocksSlice = create("blocks", "setBlocks");
export const {setBlocks} = blocksSlice.actions;
export const blocksReducer = blocksSlice.reducer;

export const levelsSlice = create("levels", "setLevels", []);
export const {setLevels} = levelsSlice.actions;
export const levelsReducer = levelsSlice.reducer;

export const lightsSlice = create("lights", "setLights", []);
export const {setLights} = lightsSlice.actions;
export const lightsReducer = lightsSlice.reducer;

// currently selected location data
export const selectedLocationSlice = create("selectedLocation", "setSelectedLocation");
export const {setSelectedLocation} = selectedLocationSlice.actions;
export const selectedLocationReducer = selectedLocationSlice.reducer;

export const selectedAreaSlice = create("selectedArea", "setSelectedArea");
export const {setSelectedArea} = selectedAreaSlice.actions;
export const selectedAreaReducer = selectedAreaSlice.reducer;

export const selectedBlockSlice = create("selectedBlock", "setSelectedBlock");
export const {setSelectedBlock} = selectedBlockSlice.actions;
export const selectedBlockReducer = selectedBlockSlice.reducer;

export const selectedLevelSlice = create("selectedLevel", "setSelectedLevel");
export const {setSelectedLevel} = selectedLevelSlice.actions;
export const selectedLevelReducer = selectedLevelSlice.reducer;

export const selectedLightsSlice = create("selectedLights", "setSelectedLights");
export const {setSelectedLights} = selectedLightsSlice.actions;
export const selectedLightsReducer = selectedLightsSlice.reducer;