import { createSlice } from "@reduxjs/toolkit";

const initialHomeInfo = {
  siteInfo: {
    name: "",
    logo: "",
    backgroundImage: [],
  },
  location: {
    website: "",
    phone: "",
    whatsApp: "",
    email: "",
    address: {
      stree: "",
      city: "",
      state: "",
      zip: "",
    }
  },
  gallery: [],
  notice: [],
  utility: []
};

export const homeSlice = createSlice({
  name: "home",
  initialState: initialHomeInfo,
  reducers: {
    setHomeInfo: (state, action) => {
      const { siteInfo, location, gallery, notice, utility } = action.payload;
      state.siteInfo = siteInfo || state.siteInfo;
      state.location = location || state.location;
      state.gallery = gallery || state.gallery;
      state.notice = notice || state.notice;
      state.utility = utility || state.utility;
    }
  }
});

// Export actions and reducer
export const { setHomeInfo } = homeSlice.actions;
export const homeReducer = homeSlice.reducer;
