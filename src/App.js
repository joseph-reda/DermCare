import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Doctors from "./pages/Doctors";
import EditProfile from "./component/EditProfile";
import Language from "./component/Language";
import ChangePassword from "./component/ChangePassword";
import NotFound from "./component/NotFound";
import MyPatient from "./pages/MyPatient";
import Footer from "./component/Footer";
import CaseFile from "./component/CaseFile";
import DoctorProfile from "./component/DoctorProfile";
import PatientProfile from "./pages/AnalyzeSkin";
import { fetchUserProfile } from "./redux/authSlice";
import ViewCaseFile from "./component/ViewCaseFile";
import "./App.css";

function App() {
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    const location = useLocation();

    useEffect(() => {
        if (localStorage.getItem("token") && !isAuthenticated && !loading) {
            dispatch(fetchUserProfile());
        }
    }, [dispatch, isAuthenticated, loading]);

    return (
        <div className="app-container">
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/doctors" element={<Doctors />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/my-patients" element={<MyPatient />} />
                    <Route path=":doctorId" element={<DoctorProfile />} />
                    <Route
                        path="/viewCaseFile/:patientId"
                        element={<ViewCaseFile />}
                    />
                    <Route
                        path="/patient-profile"
                        element={<PatientProfile />}
                    />
                    <Route
                        path="/profile/*"
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
                        <Route path="caseFile" element={<CaseFile />} />
                        <Route path="my-patients" element={<MyPatient />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            {isAuthenticated && <Footer />}
        </div>
    );
}

export default App;
