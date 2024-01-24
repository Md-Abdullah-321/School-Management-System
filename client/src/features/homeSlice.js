import { createSlice } from "@reduxjs/toolkit";

const initialHomeInfo = {
  name: "",
  logo: "",
  backgroundImage: "",
  utility: []
};

export const homeSlice = createSlice({
  name: "home",
  initialState: initialHomeInfo,
  reducers: {
    setHomeInfo: (state, action) => {
      const { name, logo, backgroundImage, utility } = action.payload;
      state.name = name || state.name;
      state.logo = logo || state.logo;
      state.backgroundImage = backgroundImage || state.backgroundImage;
      state.utility = utility || state.utility
    }
  }
});

// Export actions and reducer
export const { setHomeInfo } = homeSlice.actions;
export const homeReducer = homeSlice.reducer;
