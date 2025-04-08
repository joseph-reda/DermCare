// src/redux/authSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Simulate a list of doctor credentials for testing
const doctorsCredentials = [
    { email: "doctor1@example.com", password: "password1", name: "Dr. First Doctor", role: "doctor", specialty: "General Dermatology", location: "Cairo" },
    { email: "doctor2@example.com", password: "password2", name: "Dr. Second Doctor", role: "doctor", specialty: "Cosmetic Dermatology", location: "Alexandria" },
    // Add more test doctor accounts as needed
];

// Simulate a list of patient credentials for testing (you'll need this)
const patientsCredentials = [
    { email: "patient1@example.com", password: "passwordA", name: "Patient One", role: "patient" },
    { email: "patient2@example.com", password: "passwordB", name: "Patient Two", role: "patient" },
    // Add more test patient accounts as needed
];

// Async Thunk for User Registration (Simulated - remains the same for now)
// Async Thunk for User Registration (Simulated)
export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue, dispatch }) => {
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
        const tempUser = {
            id: Math.random().toString(36).substring(7),
            name: userData.name,
            email: userData.email,
            role: userData.role, // Use the role from the registration data
        };
        const tempToken =
            "DUMMY_TOKEN_" + Math.random().toString(36).substring(7);
        localStorage.setItem("token", tempToken);
        return { user: tempUser, token: tempToken };
    }
);


// Async Thunk for Login (Simulated - now includes doctor profile data)
export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate login delay

        const foundDoctor = doctorsCredentials.find(
            (doctor) => doctor.email === credentials.email && doctor.password === credentials.password
        );

        if (foundDoctor) {
            const tempToken = "DOCTOR_TOKEN_" + Math.random().toString(36).substring(7);
            localStorage.setItem("token", tempToken);
            return { user: { id: Math.random().toString(36).substring(7), ...foundDoctor }, token: tempToken };
        }

        const foundPatient = patientsCredentials.find(
            (patient) => patient.email === credentials.email && patient.password === credentials.password
        );

        if (foundPatient) {
            const tempToken = "PATIENT_TOKEN_" + Math.random().toString(36).substring(7);
            localStorage.setItem("token", tempToken);
            return { user: { id: Math.random().toString(36).substring(7), ...foundPatient }, token: tempToken };
        }

        return rejectWithValue("Invalid credentials.");
    }
);

// Async Thunk to Fetch User Profile (Simulated to return the logged-in user)
export const fetchUserProfile = createAsyncThunk(
    "auth/fetchProfile",
    async (_, { getState, rejectWithValue }) => {
        const token = localStorage.getItem("token");
        if (!token) {
            return rejectWithValue("No token found");
        }
        const state = getState();
        if (state.auth.user) {
            return state.auth.user;
        }
        return rejectWithValue("No user data available.");
    }
);

// Async Thunk to Update User Profile (Simulated)
export const updateUserProfile = createAsyncThunk(
    "auth/updateProfile",
    async (updatedData, { getState, rejectWithValue }) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const state = getState();
        if (state.auth.user) {
            return { ...state.auth.user, ...updatedData };
        }
        return rejectWithValue("No user data to update.");
    }
);

// Async Thunk to Change Password (Simulated)
export const changePassword = createAsyncThunk(
    "auth/changePassword",
    async ({ oldPassword, newPassword }, { getState, rejectWithValue }) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { message: "Password changed successfully (simulated)." };
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
    },
    extraReducers: (builder) => {
        // Register User Cases (Simulated)
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

        // Login Cases (Simulated - now handles both doctor and patient)
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

        // Fetch User Profile Cases (Simulated)
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
        });

        // Update User Profile Cases (Simulated)
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

        // Change Password Cases (Simulated)
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

export const { logoutUser, clearError } = authSlice.actions;

export default authSlice.reducer;