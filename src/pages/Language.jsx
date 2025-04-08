import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setLanguage } from "../redux/languageSlice"; // Correct import

const Language = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, error: authError } = useSelector((state) => state.auth);
    const {
        loading,
        error: userError,
        success,
    } = useSelector((state) => state.user);
    const currentLanguage = useSelector(
        (state) => state.language.selectedLanguage
    ); // Get language from Redux

    useEffect(() => {
        if (user && user.language) {
            setSelectedLanguage(user.language);
        } else {
            setSelectedLanguage(currentLanguage); // Use Redux state as default
        }
    }, [user, currentLanguage]);

    useEffect(() => {
        if (success) {
            navigate("/profile");
        }
    }, [success, navigate]);

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setLanguage(selectedLanguage));
        // If you need to update the backend, dispatch another action here
        // e.g., dispatch(updateUserLanguage({ language: selectedLanguage }));
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="bg-white rounded-lg shadow-md p-8 md:p-10 lg:p-12 max-w-sm mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 tracking-tight">
                        Language Settings
                    </h2>

                    {(authError || userError) && (
                        <div
                            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-sm"
                            role="alert"
                        >
                            <p className="font-semibold">Error</p>
                            <p>{authError || userError}</p>
                        </div>
                    )}

                    {success && (
                        <div
                            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-sm"
                            role="alert"
                        >
                            <p className="font-semibold">Success!</p>
                            <p>Language updated successfully!</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="language"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Select Language
                            </label>
                            <select
                                id="language"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={selectedLanguage}
                                onChange={handleLanguageChange}
                            >
                                <option value="en">English</option>
                                <option value="ar">العربية</option>
                                {/* Add more language options as needed */}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save Language"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Language;
