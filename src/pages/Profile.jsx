import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import ProfileInfo from "../component/ProfileInfo"; // Import the new component

const Profile = () => {
    const { loading, error } = useSelector((state) => state.auth);
    const location = useLocation();
    const [showHeader, setShowHeader] = useState(true);

    useEffect(() => {
        setShowHeader(location.pathname === "/profile");
    }, [location.pathname]);

    if (loading) {
        return (
            <div className="profile-container flex sm:flex-col">
                <Sidebar />
                <div className="profile-content p-6 flex-grow">
                    <div className="animate-pulse">
                        <div className="bg-gray-300 h-6 w-3/4 mb-4 rounded"></div>
                        <div className="bg-gray-200 h-4 w-1/2 mb-2 rounded"></div>
                        <div className="bg-gray-200 h-4 w-1/3 mb-4 rounded"></div>
                        <div className="bg-gray-300 h-6 w-1/4 mb-2 rounded"></div>
                        <div className="bg-gray-200 h-4 w-full mb-2 rounded"></div>
                        <div className="bg-gray-200 h-4 w-2/3 mb-4 rounded"></div>
                        {/* Conditional loading indicators based on role can stay here if needed */}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-container flex">
                <Sidebar />
                <div className="profile-content p-6 flex-grow text-center my-auto">
                    <div className="text-red-500 text-xl mb-4">
                        Error loading profile.
                    </div>
                    {/* You might want to keep a link to login/signup here if the error is due to authentication */}
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container flex min-h-screen">
            <div className="max-sm:absolute max-sm:z-50 max-sm:w-full max-sm:h-full">
                <Sidebar />
            </div>
            <div className="max-sm:mt-14 profile-content flex-grow p-6 md:p-8 lg:p-10">
                {showHeader && <ProfileInfo />}
                {/* Render the ProfileInfo component */}
                <Outlet />
            </div>
        </div>
    );
};

export default Profile;
