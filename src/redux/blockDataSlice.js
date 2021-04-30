import create from "./create";

export const blockDataSlice = create("blockData", "setBlockData");
export const {setBlockData} = blockDataSlice.actions;
export const blockDataReducer = blockDataSlice.reducer;