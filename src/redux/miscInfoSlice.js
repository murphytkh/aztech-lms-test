import create from "./create";

export const versionSlice = create("version", "setVersion");
export const {setVersion} = versionSlice.actions;
export const versionReducer = versionSlice.reducer;

export const darkModeSlice = create("darkMode", "setDarkMode");
export const {setDarkMode} = darkModeSlice.actions;
export const darkModeReducer = darkModeSlice.reducer;