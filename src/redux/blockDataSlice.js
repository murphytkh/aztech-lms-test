import create from "./create";

export const blockDataSlice = create("blockData", "setBlockData");
export const {setBlockData} = blockDataSlice.actions;
export const blockDataReducer = blockDataSlice.reducer;

export const statusDataSlice = create("statusData", "setStatusData");
export const {setStatusData} = statusDataSlice.actions;
export const statusDataReducer = statusDataSlice.reducer;

export const energyDataSlice = create("energyData", "setEnergyData");
export const {setEnergyData} = energyDataSlice.actions;
export const energyDataReducer = energyDataSlice.reducer;

export const currGraphOptionSlice = create("currGraphOption", "setCurrGraphOption", "1D");
export const {setCurrGraphOption} = currGraphOptionSlice.actions;
export const currGraphOptionReducer = currGraphOptionSlice.reducer;