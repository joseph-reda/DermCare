import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice ";       // Import your user reducer
import languageReducer from "./languageSlice"; // Import your language reducer
// ... other reducers

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,        // Add the user reducer
        language: languageReducer, // Add the language reducer
        // ... other reducers
    },
});

export default store;