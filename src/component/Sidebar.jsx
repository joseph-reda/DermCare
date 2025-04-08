import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice"; // Assuming you have a logout action

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutConfirmation(true);
    };

    const handleConfirmLogout = () => {
        dispatch(logoutUser());
        navigate("/login"); // Redirect to login page after logout
        setShowLogoutConfirmation(false);
    };

    const handleCancelLogout = () => {
        setShowLogoutConfirmation(false);
    };

    return (
        <div className="bg-gray-100 p-5 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Profile Options</h2>
            <nav className="flex flex-col space-y-2">
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        `block py-3 px-5 w-[180px] rounded-md hover:bg-gray-200 ${
                            isActive ? "bg-gray-200 font-semibold" : ""
                        }`
                    }
                    end // Ensures it matches only the exact path
                >
                    My Profile
                </NavLink>
                <NavLink
                    to="/profile/editProfile"
                    className={({ isActive }) =>
                        `block py-3 px-5 w-[180px] rounded-md hover:bg-gray-200 ${
                            isActive ? "bg-gray-200 font-semibold" : ""
                        }`
                    }
                >
                    Edit Profile
                </NavLink>
                <NavLink
                    to="/profile/changePassword"
                    className={({ isActive }) =>
                        `block py-3 px-5 w-[180px] rounded-md hover:bg-gray-200 ${
                            isActive ? "bg-gray-200 font-semibold" : ""
                        }`
                    }
                >
                    Change Password
                </NavLink>
                <NavLink
                    to="/profile/language"
                    className={({ isActive }) =>
                        `block py-3 px-5 w-[180px] rounded-md hover:bg-gray-200 ${
                            isActive ? "bg-gray-200 font-semibold" : ""
                        }`
                    }
                >
                    Language
                </NavLink>
                {user?.role === "doctor" && (
                    <NavLink
                        to="/profile/my-patients"
                        className={({ isActive }) =>
                            `block py-3 px-5 w-[180px] rounded-md hover:bg-gray-200 ${
                                isActive ? "bg-gray-200 font-semibold" : ""
                            }`
                        }
                    >
                        My Patients
                    </NavLink>
                )}
                {user?.role === "patient" && (
                    <NavLink
                        to="/profile/caseFile"
                        className={({ isActive }) =>
                            `block py-3 px-5 w-[180px] rounded-md hover:bg-gray-200 ${
                                isActive ? "bg-gray-200 font-semibold" : ""
                            }`
                        }
                    >
                        Case Files
                    </NavLink>
                )}
                <button
                    onClick={handleLogoutClick}
                    className="block py-3 px-5 rounded-md hover:bg-gray-200 text-left w-full"
                >
                    Logout
                </button>
            </nav>

            {showLogoutConfirmation && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-[350px] h-[160px] rounded-md shadow-md p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Are you sure you want to logout?
                        </h3>
                        <div className="flex justify-end gap-10 mt-10">
                            <button
                                onClick={handleCancelLogout}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-5 w-[180px] rounded focus:outline-none focus:shadow-outline"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmLogout} // Use handleConfirmLogout here
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-5 w-[180px] rounded focus:outline-none focus:shadow-outline"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
