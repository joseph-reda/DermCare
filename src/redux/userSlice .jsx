import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
