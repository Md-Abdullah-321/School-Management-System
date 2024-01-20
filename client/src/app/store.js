import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import { homeReducer } from "../features/homeSlice";
import { teacherReducer } from "../features/loginSlice";




const rootReducer = combineReducers({ sitesettingsinfo: homeReducer, user: teacherReducer });

const persistConfig = {
    key: rootReducer,
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

export const persistor = persistStore(store);