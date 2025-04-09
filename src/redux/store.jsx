import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice ";
import languageReducer from "./languageSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        language: languageReducer,
    },
});

export default store;