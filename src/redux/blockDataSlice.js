import create from "./create";

export const blockDataSlice = create("blockData", "setBlockData");
export const {setBlockData} = blockDataSlice.actions;
export const blockDataReducer = blockDataSlice.reducer;

export const statusDataSlice = create("statusData", "setStatusData");
export const {setStatusData} = statusDataSlice.actions;
export const statusDataReducer = statusDataSlice.reducer;