// component/Navbar.js
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import profilePlaceholder from "../assets/images/profile.jpg";

const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-blue-600 text-white py-3 shadow-md">
            <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link to="/" className="text-xl font-bold tracking-tight">
                    Derma Scan
                </Link>

                <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
                    <NavLink
                        to="/home"
                        className={({ isActive }) =>
                            `py-2 px-3 rounded-md hover:bg-blue-500 transition duration-200 ${
                                isActive ? "bg-blue-500 font-semibold" : ""
                            }`
                        }
                    >
                        Home
                    </NavLink>

                    {isAuthenticated && user?.role === "patient" && (
                        <NavLink
                            to="/doctors"
                            className={({ isActive }) =>
                                `py-2 px-3 rounded-md hover:bg-blue-500 transition duration-200 ${
                                    isActive ? "bg-blue-500 font-semibold" : ""
                                }`
                            }
                        >
                            Doctors
                        </NavLink>
                    )}
                    {isAuthenticated && user?.role === "patient" && (
                        <NavLink
                            to="/patient-profile"
                            className={({ isActive }) =>
                                `py-2 px-3 rounded-md hover:bg-blue-500 transition duration-200 ${
                                    isActive ? "bg-blue-500 font-semibold" : ""
                                }`
                            }
                        >
                            Analyze Skin
                        </NavLink>
                    )}
                    {isAuthenticated && user?.role === "doctor" && (
                        <NavLink
                            to="/my-patients"
                            className={({ isActive }) =>
                                `py-2 px-3 rounded-md hover:bg-blue-500 transition duration-200 ${
                                    isActive ? "bg-blue-500 font-semibold" : ""
                                }`
                            }
                        >
                            My Patients
                        </NavLink>
                    )}
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `py-2 px-3 rounded-md hover:bg-blue-500 transition duration-200 ${
                                isActive ? "bg-blue-500 font-semibold" : ""
                            }`
                        }
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            `py-2 px-3 rounded-md hover:bg-blue-500 transition duration-200 ${
                                isActive ? "bg-blue-500 font-semibold" : ""
                            }`
                        }
                    >
                        Contact
                    </NavLink>
                    {user && (
                        <NavLink
                            to="/profile"
                            className="flex items-center hover:opacity-80 transition duration-200"
                        >
                            <img
                                src={profilePlaceholder}
                                alt="Profile"
                                className="rounded-full w-8 h-8 object-cover shadow-sm"
                            />
                        </NavLink>
                    )}
                    {!user && (
                        <div className="space-x-3">
                            <NavLink
                                to="/login"
                                className="py-2 px-4 rounded-md hover:bg-blue-500 transition duration-200"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className="py-2 px-4 rounded-md bg-white text-blue-600 font-semibold hover:bg-blue-100 transition duration-200"
                            >
                                Sign Up
                            </NavLink>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="focus:outline-none"
                        aria-label="Toggle mobile menu"
                    >
                        <svg
                            className="w-6 h-6 fill-current"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-blue-600 py-2 px-4 flex flex-col items-center">
                    <NavLink
                        to="/home"
                        className="block py-2 hover:bg-blue-500 rounded-md w-full text-center"
                        onClick={toggleMobileMenu}
                    >
                        Home
                    </NavLink>

                    {isAuthenticated && user?.role === "patient" && (
                        <NavLink
                            to="/doctors"
                            className="block py-2 hover:bg-blue-500 rounded-md w-full text-center"
                            onClick={toggleMobileMenu}
                        >
                            Doctors
                        </NavLink>
                    )}
                    {isAuthenticated && user?.role === "patient" && (
                        <NavLink
                            to="/patient-profile"
                            className="block py-2 hover:bg-blue-500 rounded-md w-full text-center"
                            onClick={toggleMobileMenu}
                        >
                            Analyze Skin
                        </NavLink>
                    )}
                    {isAuthenticated && user?.role === "doctor" && (
                        <NavLink
                            to="/my-patients"
                            className="block py-2 hover:bg-blue-500 rounded-md w-full text-center"
                            onClick={toggleMobileMenu}
                        >
                            My Patients
                        </NavLink>
                    )}
                    <NavLink
                        to="/about"
                        className="block py-2 hover:bg-blue-500 rounded-md w-full text-center"
                        onClick={toggleMobileMenu}
                    >
                        About
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className="block py-2 hover:bg-blue-500 rounded-md w-full text-center"
                        onClick={toggleMobileMenu}
                    >
                        Contact
                    </NavLink>
                    {isAuthenticated && (
                        <NavLink
                            to="/profile"
                            className="block py-2 hover:bg-blue-500 rounded-md w-full text-center"
                            onClick={toggleMobileMenu}
                        >
                            Profile
                        </NavLink>
                    )}
                    {!isAuthenticated && (
                        <>
                            <NavLink
                                to="/login"
                                className="block py-2 hover:bg-blue-500 rounded-md w-full text-center"
                                onClick={toggleMobileMenu}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className="block py-2 hover:bg-blue-500 rounded-md w-full text-center bg-white text-blue-600 font-semibold mt-2"
                                onClick={toggleMobileMenu}
                            >
                                Sign Up
                            </NavLink>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;