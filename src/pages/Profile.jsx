import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, Link } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import ProfileInfo from "../component/ProfileInfo";

const Profile = () => {
    const { loading, error, user } = useSelector((state) => state.auth);
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
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container flex min-h-screen">
            {user && !error ? (
                <>
                    <div className="max-sm:absolute max-sm:z-50 max-sm:w-full max-sm:h-full">
                        <Sidebar />
                    </div>
                    <div className="max-sm:mt-14 profile-content flex-grow p-6 md:p-8 lg:p-10">
                        {error && (
                            <div className="rounded-md bg-red-100 p-4 mb-4 border border-red-400 text-red-700">
                                <strong className="font-bold">Error:</strong>
                                <span className="ml-2">{error}</span>
                            </div>
                        )}
                        {user && showHeader && <ProfileInfo user={user} />}
                        <Outlet />
                    </div>
                </>
            ) : (
                <div className="max-sm:mt-14 profile-content flex-grow p-6 md:p-8 lg:p-10 flex flex-col items-center justify-center">
                    {error && (
                        <div className="rounded-md bg-red-100 p-4 mb-4 border border-red-400 text-red-700">
                            <strong className="font-bold">Error:</strong>
                            <span className="ml-2">{error}</span>
                        </div>
                    )}
                    <div className="text-center">
                        <p className="text-gray-600 mb-4">
                            Please log in or sign up to view your profile
                            information.
                        </p>
                        <div className="space-x-4">
                            <Link
                                to="/login"
                                className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Log In
                            </Link>
                            <Link
                                to="/signup"
                                className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
