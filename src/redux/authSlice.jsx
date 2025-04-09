import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Doctor fake data
const doctorsCredentials = [
    {
        email: "doctor1@example.com",
        password: "password1",
        name: "Dr. First Doctor",
        role: "doctor",
        specialty: "General Dermatology",
        location: "Cairo",
    },
    {
        email: "doctor2@example.com",
        password: "password2",
        name: "Dr. Second Doctor",
        role: "doctor",
        specialty: "Cosmetic Dermatology",
        location: "Alexandria",
    },
];
// Patient fake data
const patientsCredentials = [
    {
        email: "patient1@example.com",
        password: "passwordA",
        name: "Patient One",
        role: "patient",
    },
    {
        email: "patient2@example.com",
        password: "passwordB",
        name: "Patient Two",
        role: "patient",
    },
];

// Async Thunk Registration
export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (
            !userData.email ||
            !userData.password ||
            !userData.name ||
            !userData.role
        ) {
            return rejectWithValue(
                "Please fill in all required fields, including role."
            );
        }
        // Create fake user
        const tempUser = {
            id: Math.random().toString(36).substring(7),
            name: userData.name,
            email: userData.email,
            role: userData.role,
        };
        const tempToken =
            "DUMMY_TOKEN_" + Math.random().toString(36).substring(7);
        localStorage.setItem("token", tempToken);
        return { user: tempUser, token: tempToken };
    }
);

// Async Thunk for Login
export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate login delay

        const foundDoctor = doctorsCredentials.find(
            (doctor) =>
                doctor.email === credentials.email &&
                doctor.password === credentials.password
        );

        if (foundDoctor) {
            const tempToken =
                "DOCTOR_TOKEN_" + Math.random().toString(36).substring(7);
            localStorage.setItem("token", tempToken);
            return {
                user: {
                    id: Math.random().toString(36).substring(7),
                    ...foundDoctor,
                },
                token: tempToken,
            };
        }

        const foundPatient = patientsCredentials.find(
            (patient) =>
                patient.email === credentials.email &&
                patient.password === credentials.password
        );

        if (foundPatient) {
            const tempToken =
                "PATIENT_TOKEN_" + Math.random().toString(36).substring(7);
            localStorage.setItem("token", tempToken);
            return {
                user: {
                    id: Math.random().toString(36).substring(7),
                    ...foundPatient,
                },
                token: tempToken,
            };
        }

        return rejectWithValue("Invalid credentials"); // More specific error message
    }
);

export const fetchUserProfile = createAsyncThunk(
    "auth/fetchProfile",
    async (_, { getState, rejectWithValue }) => {
        const state = getState();
        if (state.auth.user) {
            return state.auth.user;
        }
        const token = localStorage.getItem("token");
        if (token) {
            return rejectWithValue(
                "No user data in store, consider re-logging."
            );
        }
        return rejectWithValue("Not authenticated.");
    }
);

// Async Thunk Update User Profile (Fake update)
export const updateUserProfile = createAsyncThunk(
    "auth/updateProfile",
    async (updatedData, { getState, rejectWithValue }) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const state = getState();
        if (state.auth.user) {
            return { ...state.auth.user, ...updatedData };
        }
        return rejectWithValue("No user data to update.");
    }
);

// Async Thunk Change Password
export const changePassword = createAsyncThunk(
    "auth/changePassword",
    async ({ oldPassword, newPassword }, { getState, rejectWithValue }) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return { message: "Password changed successfully." };
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: !!localStorage.getItem("token"),
        user: null,
        token: localStorage.getItem("token"),
        loading: false,
        error: null,
        updateProfileLoading: false,
        updateProfileError: null,
        updateProfileSuccess: false,
        changePasswordLoading: false,
        changePasswordError: null,
        changePasswordSuccess: false,
    },
    reducers: {
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
        clearError: (state) => {
            state.error = null;
            state.updateProfileError = null;
            state.updateProfileSuccess = false;
            state.changePasswordError = null;
            state.changePasswordSuccess = false;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        // Register User
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Login
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Fetch User Profile
        builder.addCase(fetchUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        });
        builder.addCase(fetchUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        });

        // Update User Profile
        builder.addCase(updateUserProfile.pending, (state) => {
            state.updateProfileLoading = true;
            state.updateProfileError = null;
            state.updateProfileSuccess = false;
        });
        builder.addCase(updateUserProfile.fulfilled, (state, action) => {
            state.updateProfileLoading = false;
            state.user = action.payload;
            state.updateProfileSuccess = true;
        });
        builder.addCase(updateUserProfile.rejected, (state, action) => {
            state.updateProfileLoading = false;
            state.updateProfileError = action.payload;
            state.updateProfileSuccess = false;
        });

        // Change Password
        builder.addCase(changePassword.pending, (state) => {
            state.changePasswordLoading = true;
            state.changePasswordError = null;
            state.changePasswordSuccess = false;
        });
        builder.addCase(changePassword.fulfilled, (state, action) => {
            state.changePasswordLoading = false;
            state.changePasswordSuccess = true;
        });
        builder.addCase(changePassword.rejected, (state, action) => {
            state.changePasswordLoading = false;
            state.changePasswordError = action.payload;
            state.changePasswordSuccess = false;
        });
    },
});

export const { logoutUser, clearError, setUser, setToken } = authSlice.actions;

export default authSlice.reducer;
