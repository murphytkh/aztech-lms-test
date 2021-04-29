import create from "./create";

export const editProfileSlice = create("editProfile", "setEditProfile");
export const {setEditProfile} = editProfileSlice.actions;
export const editProfileReducer = editProfileSlice.reducer;

export const relocationSlice = create("relocation", "setRelocation");
export const {setRelocation} = relocationSlice.actions;
export const relocationReducer = relocationSlice.reducer;