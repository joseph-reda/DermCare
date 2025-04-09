import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("patient");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(
        (state) => state.auth
    );

    const handleSignup = (e) => {
        e.preventDefault();
        dispatch(registerUser({ name, email, password, role }));
    };

    useLayoutEffect(() => {
        if (isAuthenticated) {
            navigate("/home");
        }

        return () => {
            dispatch(clearError());
        };
    }, [isAuthenticated, navigate, dispatch]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-lg rounded-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Sign Up
                </h2>
                {error && (
                    <p className="text-red-500 text-sm text-center mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div className="relative">
                        <FaUser className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-10 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-10 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-10 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <label className="text-gray-700 font-semibold">
                            Account Type:
                        </label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="p-2 border rounded-md text-gray-700"
                        >
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    Already have an account?
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
