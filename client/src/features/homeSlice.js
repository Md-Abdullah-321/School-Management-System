import { createSlice } from "@reduxjs/toolkit";

const initialHomeInfo = {
  name: "",
  logo: "",
  backgroundImage: ""
};

export const homeSlice = createSlice({
  name: "home",
  initialState: initialHomeInfo,
  reducers: {
    setHomeInfo: (state, action) => {
      const { name, logo, backgroundImage } = action.payload;
      state.name = name || state.name;
      state.logo = logo || state.logo;
      state.backgroundImage = backgroundImage || state.backgroundImage;
    }
  }
});

// Export actions and reducer
export const { setHomeInfo } = homeSlice.actions;
export const homeReducer = homeSlice.reducer;
