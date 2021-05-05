import create from "./create";

// current selected objects
export const selectedSlice = create("selected", "setSelected", []);
export const {setSelected} = selectedSlice.actions;
export const selectedReducer = selectedSlice.reducer;