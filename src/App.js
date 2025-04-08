import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom"; // Removed BrowserRouter import here
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Doctors from "./pages/Doctors";
import EditProfile from "./pages/EditProfile";
import Language from "./pages/Language";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./component/NotFound";
import MyPatient from "./component/MyPatient";
import Footer from "./component/Footer";
import CaseFile from "./component/CaseFile";
import { fetchUserProfile } from "./redux/authSlice"; // Import fetchUserProfile action
import DoctorProfile from "./pages/DoctorProfile";
import PatientProfile from "./pages/PatientProfile";
import "./App.css"; // Import global styles (optional, but good practice)
import ViewCaseFile from "./component/ViewCaseFile";

function App() {
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    const location = useLocation();

    useEffect(() => {
        // Check for token on app load and fetch user profile
        if (localStorage.getItem("token") && !isAuthenticated && !loading) {
            dispatch(fetchUserProfile());
        }
    }, [dispatch, isAuthenticated, loading]);

    return (
        <div className="app-container">
            {/* Use a dedicated container for App */}
            <Navbar />
            <main className="main-content">
                {/* Use <main> for semantic content */}
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/doctors" element={<Doctors />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/my-patients" element={<MyPatient />} />
                    <Route path=":doctorId" element={<DoctorProfile />} />{" "}
                    <Route path="/viewCaseFile/:patientId" element={<ViewCaseFile />} /> {/* The new route for ViewCaseFile */}

                    {/* New route for doctor profile */}
                    <Route
                        path="/patient-profile"
                        element={<PatientProfile />}
                    />
                    {/* Protected Routes */}
                    <Route
                        path="/profile/*" // Match any route starting with /profile
                        element={
                            isAuthenticated ? (
                                <Profile />
                            ) : (
                                <Navigate
                                    to="/login"
                                    state={{ from: location }}
                                    replace
                                />
                            )
                        }
                    >
                        <Route path="editProfile" element={<EditProfile />} />
                        <Route
                            path="changePassword"
                            element={<ChangePassword />}
                        />
                        <Route path="language" element={<Language />} />
                        <Route path="caseFile" element={<CaseFile />} />{" "}
                        {/* CaseFile route without parameter */}
                        <Route
                            path="my-patients"
                            element={<MyPatient />}
                        />{" "}
                        {/* Adjusted path - consider nesting under /profile if it makes sense */}
                        {/* Sidebar will be integrated into the Profile component */}
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            {isAuthenticated && <Footer />} {/* Conditionally render Footer */}
        </div>
    );
}

export default App;
