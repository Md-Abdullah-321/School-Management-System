import { configureStore } from "@reduxjs/toolkit";
import { homeReducer } from "../features/homeSlice";
import { teacherReducer } from "../features/loginSlice";



const store = configureStore({
    reducer: {
        home: homeReducer,
        teacher: teacherReducer,
    }
});

export default store;