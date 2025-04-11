import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserProfile, clearError } from "../redux/authSlice";
import { clearUserError } from "../redux/userSlice ";

const EditProfile = () => {
    const {
        user,
        error: authError,
        updateProfileLoading,
        updateProfileError,
        updateProfileSuccess,
    } = useSelector((state) => state.auth);
    const { error: userError } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [location, setLocation] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
            if (user.role === "doctor") {
                setSpecialty(user.specialty || "");
                setLocation(user.location || "");
            }
        }
    }, [user]);

    useEffect(() => {
        if (updateProfileSuccess) {
            navigate("/profile");
        }

        return () => {
            dispatch(clearError());
            if (clearUserError) {
                dispatch(clearUserError());
            }
        };
    }, [updateProfileSuccess, navigate, dispatch, clearUserError]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProfileData = { name, email };
        if (user?.role === "doctor") {
            updatedProfileData.specialty = specialty;
            updatedProfileData.location = location;
        }
        dispatch(updateUserProfile(updatedProfileData));
    };

    return (
        <div className="min-h-screen py-12">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="bg-white rounded-lg shadow-md p-8 md:p-10 lg:p-12 max-w-lg mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 tracking-tight">
                        Edit Your Profile
                    </h2>

                    {(authError || updateProfileError || userError) && (
                        <div
                            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-sm"
                            role="alert"
                        >
                            <p className="font-semibold">Error</p>
                            <p>
                                {authError || updateProfileError || userError}
                            </p>
                        </div>
                    )}

                    {updateProfileSuccess && (
                        <div
                            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-sm"
                            role="alert"
                        >
                            <p className="font-semibold">Success!</p>
                            <p>Your profile has been updated successfully.</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {user?.role === "doctor" && (
                            <>
                                <div>
                                    <label
                                        htmlFor="specialty"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Specialty
                                    </label>
                                    <input
                                        type="text"
                                        id="specialty"
                                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={specialty}
                                        onChange={(e) =>
                                            setSpecialty(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="location"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={location}
                                        onChange={(e) =>
                                            setLocation(e.target.value)
                                        }
                                    />
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300"
                            disabled={updateProfileLoading}
                        >
                            {updateProfileLoading
                                ? "Saving..."
                                : "Save Changes"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
