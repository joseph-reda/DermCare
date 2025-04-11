import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.auth);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    useEffect(() => {
        if (user) {
            navigate("/home");
        }

        return () => {
            dispatch(clearError());
        };
    }, [user, navigate, dispatch]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-lg rounded-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
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
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    Don't have an account?
                    <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;