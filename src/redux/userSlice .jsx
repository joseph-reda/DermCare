// src/redux/userSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // ... other user-related state
    error: null,
    loading: false,
    success: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUserError: (state) => {
            state.error = null;
        },
        // ... other user-related reducers
    },
    // ... extraReducers for any async user actions
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;