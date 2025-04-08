import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import "./Profile.css"; // Import your profile-specific styles

const Profile = () => {
    const { user, loading, error } = useSelector((state) => state.auth);
    const location = useLocation();
    const [showHeader, setShowHeader] = useState(true);

    useEffect(() => {
        // Hide the main profile content when a nested route is active
        setShowHeader(location.pathname === "/profile");
    }, [location.pathname]);
    if (loading) {
        return (
            <div className="profile-container flex">
                <Sidebar />
                <div className="profile-content p-6 flex-grow">
                    <div className="animate-pulse">
                        <div className="bg-gray-300 h-6 w-3/4 mb-4 rounded"></div>
                        <div className="bg-gray-200 h-4 w-1/2 mb-2 rounded"></div>
                        <div className="bg-gray-200 h-4 w-1/3 mb-4 rounded"></div>
                        <div className="bg-gray-300 h-6 w-1/4 mb-2 rounded"></div>
                        <div className="bg-gray-200 h-4 w-full mb-2 rounded"></div>
                        <div className="bg-gray-200 h-4 w-2/3 mb-4 rounded"></div>
                        {user?.role === "doctor" && (
                            <>
                                <div className="bg-gray-300 h-6 w-1/3 mb-2 rounded"></div>
                                <div className="bg-gray-200 h-4 w-1/2 mb-4 rounded"></div>
                                <div className="bg-blue-300 h-10 w-40 rounded"></div>
                            </>
                        )}
                        {user?.role === "patient" && (
                            <div className="bg-blue-300 h-10 w-40 rounded"></div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="profile-container flex">
                <Sidebar />
                <div className="profile-content p-6 flex-grow text-red-500">
                    Error loading profile:{" "}
                    {error || "Could not load user profile. Please try again."}
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="profile-content flex-grow p-6 md:p-8 lg:p-10">
                {showHeader && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Your Profile
                        </h2>
                        <div className="mb-4">
                            <strong className="block text-gray-700 mb-1">
                                Full Name:
                            </strong>
                            <p className="text-gray-800">
                                {user.name || "Not available"}
                            </p>
                        </div>
                        <div className="mb-4">
                            <strong className="block text-gray-700 mb-1">
                                Email:
                            </strong>
                            <p className="text-gray-800">
                                {user.email || "Not available"}
                            </p>
                        </div>
                        {user.role && (
                            <div className="mb-4">
                                <strong className="block text-gray-700 mb-1">
                                    Role:
                                </strong>
                                <p className="text-gray-800">{user.role}</p>
                            </div>
                        )}

                        {user?.role === "doctor" && (
                            <div className="mt-6 border-t pt-6">
                                {user.specialty && (
                                    <div className="mb-4">
                                        <strong className="block text-gray-700 mb-1">
                                            Specialty:
                                        </strong>
                                        <p className="text-gray-800">
                                            {user.specialty}
                                        </p>
                                    </div>
                                )}
                                {user.location && (
                                    <div className="mb-4">
                                        <strong className="block text-gray-700 mb-1">
                                            Location:
                                        </strong>
                                        <p className="text-gray-800">
                                            {user.location}
                                        </p>
                                    </div>
                                )}
                                <Link
                                    to="/my-patients"
                                    className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                                >
                                    View My Patients
                                </Link>
                            </div>
                        )}

                        {user?.role === "patient" && (
                            <div className="mt-6 border-t pt-6">
                                <p className="text-gray-600 mb-4">
                                    Welcome, Patient! You can browse doctors and
                                    manage your appointments here.
                                </p>
                                <Link
                                    to="/doctors"
                                    className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                                >
                                    Find a Doctor
                                </Link>
                            </div>
                        )}
                    </div>
                )}
                <Outlet /> {/* Render the content of the nested routes */}
            </div>
        </div>
    );
};

export default Profile;
