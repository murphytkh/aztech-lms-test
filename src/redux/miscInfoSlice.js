import create from "./create";

export const versionSlice = create("version", "setVersion");
export const {setVersion} = versionSlice.actions;
export const versionReducer = versionSlice.reducer;

export const darkModeSlice = create("darkMode", "setDarkMode");
export const {setDarkMode} = darkModeSlice.actions;
export const darkModeReducer = darkModeSlice.reducer;

export const gatewayInfoSlice = create("gatewayInfo", "setGatewayInfo");
export const {setGatewayInfo} = gatewayInfoSlice.actions;
export const gatewayInfoReducer = gatewayInfoSlice.reducer;