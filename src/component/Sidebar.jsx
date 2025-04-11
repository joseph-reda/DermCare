import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutConfirmation(true);
    };

    const handleConfirmLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
        setShowLogoutConfirmation(false);
        setIsMobileMenuOpen(false); // Close mobile menu after logout
    };

    const handleCancelLogout = () => {
        setShowLogoutConfirmation(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="bg-gray-100 rounded-sm shadow-sm sm:w-60 w-full sm:h-full">
            <div className="sm:hidden p-2">
                <button
                    onClick={toggleMobileMenu}
                    className="focus:outline-none"
                    aria-label="Toggle mobile menu"
                >
                    <svg
                        className="w-8 h-7 ml-2 fill-current"
                        viewBox="0 0 24 24"
                    >
                        {isMobileMenuOpen ? (
                            <path
                                fillRule="evenodd"
                                d="M18.293 17.293a1 1 0 0 1-1.414 1.414L12 13.414l-4.879 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 1.414-1.414L12 10.586l4.879-5.293a1 1 0 0 1 1.414 1.414L13.414 12l5.293 5.293z"
                            />
                        ) : (
                            <path
                                fillRule="evenodd"
                                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {(isMobileMenuOpen || !isMobileMenuOpen) && (
                <div
                    className={`${
                        isMobileMenuOpen
                            ? "max-sm:-mt-5 block p-5"
                            : "hidden sm:block p-5"
                    }`}
                >
                    <h2 className="text-xl font-semibold mb-2">
                        Profile Options
                    </h2>
                    <nav className="flex flex-col space-y-2">
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `block py-3 px-5 rounded-sm hover:bg-gray-200 ${
                                    isActive ? "bg-gray-200 font-semibold" : ""
                                }`
                            }
                            end
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            My Profile
                        </NavLink>
                        <NavLink
                            to="/profile/editProfile"
                            className={({ isActive }) =>
                                `block py-3 px-5 rounded-sm hover:bg-gray-200 ${
                                    isActive ? "bg-gray-200 font-semibold" : ""
                                }`
                            }
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Edit Profile
                        </NavLink>
                        <NavLink
                            to="/profile/changePassword"
                            className={({ isActive }) =>
                                `block py-3 px-5 rounded-sm hover:bg-gray-200 ${
                                    isActive ? "bg-gray-200 font-semibold" : ""
                                }`
                            }
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Change Password
                        </NavLink>
                        <NavLink
                            to="/profile/language"
                            className={({ isActive }) =>
                                `block py-3 px-5 rounded-sm hover:bg-gray-200 ${
                                    isActive ? "bg-gray-200 font-semibold" : ""
                                }`
                            }
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Language
                        </NavLink>
                        {user?.role === "doctor" && (
                            <NavLink
                                to="/profile/my-patients"
                                className={({ isActive }) =>
                                    `block py-3 px-5 rounded-sm hover:bg-gray-200 ${
                                        isActive
                                            ? "bg-gray-200 font-semibold"
                                            : ""
                                    }`
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                My Patients
                            </NavLink>
                        )}
                        {user?.role === "patient" && (
                            <NavLink
                                to="/profile/caseFile"
                                className={({ isActive }) =>
                                    `block py-3 px-5 rounded-sm hover:bg-gray-200 ${
                                        isActive
                                            ? "bg-gray-200 font-semibold"
                                            : ""
                                    }`
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Case Files
                            </NavLink>
                        )}
                        <button
                            onClick={handleLogoutClick}
                            className="block py-3 px-5 rounded-sm hover:bg-gray-200 text-left w-full"
                        >
                            Logout
                        </button>
                    </nav>
                </div>
            )}

            {showLogoutConfirmation && (
                <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-[350px] h-[160px] rounded-sm shadow-sm p-6">
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
                                onClick={handleConfirmLogout}
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
