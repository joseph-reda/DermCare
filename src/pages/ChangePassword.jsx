import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword, clearError } from "../redux/authSlice";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        changePasswordLoading: loading,
        changePasswordError: error,
        changePasswordSuccess,
    } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match.");
            return;
        }
        dispatch(changePassword({ oldPassword, newPassword }));
    };

    useEffect(() => {
        if (changePasswordSuccess) {
            alert("Password changed successfully!");
            navigate("/profile"); // Redirect after successful password change
        }

        return () => {
            dispatch(clearError());
        };
    }, [changePasswordSuccess, navigate, dispatch]);

    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="bg-white rounded-lg shadow-md p-8 md:p-10 lg:p-12 max-w-md mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 tracking-tight">
                        Change Your Password
                    </h2>

                    {error && (
                        <div
                            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-sm"
                            role="alert"
                        >
                            <p className="font-semibold">Error</p>
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="oldPassword"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Current Password
                            </label>
                            <input
                                type="password"
                                id="oldPassword"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="newPassword"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300"
                            disabled={loading}
                        >
                            {loading ? "Changing..." : "Change Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
